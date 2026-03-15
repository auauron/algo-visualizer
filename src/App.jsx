import React, { useState, useRef, useEffect } from 'react';
import WatchMode from './components/WatchMode';
import ExamMode from './components/ExamMode';
import Sidebar from './components/Sidebar';
import QuizMode from './components/QuizMode';
import { ALGORITHMS, generateBestCase } from './algorithms';
import './index.css';

const ALGO_LIST = Object.values(ALGORITHMS);

export default function App() {
  const [activeAlgo, setActiveAlgo] = useState('selection');
  const [activeMode, setActiveMode] = useState('watch'); // 'watch' | 'exam' | 'quiz'
  const [currentStep, setCurrentStep] = useState(null);

  // WatchMode shares currentStep via callback for Sidebar pseudocode highlighting
  const watchRef = useRef(null);

  return (
    <div className="app-shell">
      {/* Header */}
      <header className="app-header">
        <div className="header-logo">
          <div className="logo-icon">🔢</div>
          <div>
            <div className="logo-text">AlgoTrace</div>
            <div className="logo-sub">Sorting Visualizer by ronski</div>
          </div>
        </div>
        <nav className="header-nav">
          <button
            className={`nav-tab ${activeMode === 'watch' ? 'active' : ''}`}
            onClick={() => setActiveMode('watch')}
          >
            📊 Watch Mode
          </button>
          <button
            className={`nav-tab ${activeMode === 'exam' ? 'active' : ''}`}
            onClick={() => setActiveMode('exam')}
          >
            🎓 Exam Mode
          </button>
          <button
            className={`nav-tab ${activeMode === 'quiz' ? 'active' : ''}`}
            onClick={() => setActiveMode('quiz')}
          >
            🧠 Quiz Mode
          </button>
        </nav>
      </header>

      {/* Algorithm Selector — hidden in Quiz Mode (quiz has its own filter) */}
      {activeMode !== 'quiz' && (
        <div className="algo-selector-bar">
          {ALGO_LIST.map(algo => (
            <button
              key={algo.id}
              className={`algo-chip ${activeAlgo === algo.id ? 'active' : ''}`}
              onClick={() => setActiveAlgo(algo.id)}
            >
              <div
                className="algo-chip-dot"
                style={{ background: activeAlgo === algo.id ? algo.color : 'var(--text-muted)' }}
              />
              {algo.label}
              <span style={{
                fontSize: '0.65rem',
                color: activeAlgo === algo.id ? 'var(--text-secondary)' : 'var(--text-muted)',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                padding: '0 4px',
                fontFamily: 'var(--font-mono)',
              }}>
                {algo.info.timeAvg}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="main-content">
        {activeMode === 'quiz' ? (
          <div style={{ flex: 1, minWidth: 0 }}>
            <QuizMode />
          </div>
        ) : activeMode === 'watch' ? (
          <WatchModeWithStep algoId={activeAlgo} onStepChange={setCurrentStep} />
        ) : (
          <ExamMode key={activeAlgo} algoId={activeAlgo} />
        )}

        {activeMode !== 'quiz' && (
          <Sidebar algoId={activeAlgo} currentStep={activeMode === 'watch' ? currentStep : null} />
        )}
      </div>
    </div>
  );
}

// Wrapper to capture currentStep from WatchMode and share with Sidebar
function WatchModeWithStep({ algoId, onStepChange }) {
  return <WatchModeConnected algoId={algoId} onStepChange={onStepChange} />;
}

// Enhanced WatchMode that notifies parent of step changes
function WatchModeConnected({ algoId, onStepChange }) {
  const [inputText, setInputText] = useState('64,25,12,22,11,78,43,56,31,88');
  const [steps, setSteps] = useState([]);
  const [stepIdx, setStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [caseMode, setCaseMode] = useState('random');
  const [commentUpdating, setCommentUpdating] = useState(false);
  const intervalRef = useRef(null);
  const prevComment = useRef('');
  const algo = ALGORITHMS[algoId];

  const PRESETS = [
    { label: 'Random 12', values: () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 95) + 5) },
    { label: 'Random 8', values: () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 95) + 5) },
    { label: 'Reverse 10', values: () => Array.from({ length: 10 }, (_, i) => 100 - i * 9) },
    { label: 'Nearly Sorted', values: () => [10, 20, 30, 40, 60, 50, 70, 90, 80, 100] },
  ];

  const parseInput = (text) => {
    const nums = text.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0);
    return nums.length >= 2 ? nums : null;
  };

  const buildSteps = (inputArr) => {
    const s = algo.generateSteps([...inputArr]);
    setSteps(s);
    setStepIdx(0);
    setIsPlaying(false);
    onStepChange(s[0] || null);
  };

  useEffect(() => {
    const nums = parseInput(inputText);
    if (nums) buildSteps(nums);
  }, [algoId]); // eslint-disable-line

  useEffect(() => {
    onStepChange(steps[stepIdx] || null);
  }, [stepIdx, steps]); // eslint-disable-line

  const currentStep = steps[stepIdx] || null;

  useEffect(() => {
    if (!isPlaying) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(() => {
      setStepIdx(prev => {
        if (prev >= steps.length - 1) { setIsPlaying(false); return prev; }
        return prev + 1;
      });
    }, Math.round(800 / speed));
    return () => clearInterval(intervalRef.current);
  }, [isPlaying, speed, steps.length]);

  useEffect(() => {
    if (!currentStep) return;
    if (currentStep.comment !== prevComment.current) {
      setCommentUpdating(true);
      prevComment.current = currentStep.comment;
      const t = setTimeout(() => setCommentUpdating(false), 300);
      return () => clearTimeout(t);
    }
  }, [currentStep]);

  const handleApply = () => {
    let nums = parseInput(inputText);
    if (!nums) return;
    if (caseMode === 'best') nums = nums.sort((a, b) => a - b);
    else if (caseMode === 'worst') nums = nums.sort((a, b) => b - a);
    buildSteps(nums);
  };

  const handlePreset = (preset) => {
    const nums = preset.values();
    setInputText(nums.join(', '));
    buildSteps(nums);
    setCaseMode('random');
  };

  const handleCaseToggle = (mode) => {
    setCaseMode(mode);
    const nums = parseInput(inputText);
    if (!nums) return;
    let processed = [...nums];
    if (mode === 'best') processed = processed.sort((a, b) => a - b);
    else if (mode === 'worst') processed = processed.sort((a, b) => b - a);
    buildSteps(processed);
  };

  if (!currentStep) {
    return (
      <div className="left-panel">
        <div className="card"><div className="empty-state"><div className="empty-icon">📊</div><div>Enter numbers to start.</div></div></div>
      </div>
    );
  }

  const { array, comparing, swapping, sorted, comment, gap, pivot } = currentStep;
  const maxVal = Math.max(...array);

  const getBarClass = (idx) => {
    if (sorted?.includes(idx)) return 'bar-sorted';
    if (swapping?.includes(idx)) return 'bar-swap';
    if (comparing?.includes(idx)) return 'bar-compare';
    if (pivot !== undefined && pivot === idx) return 'bar-pivot';
    return 'bar-default';
  };

  const progress = steps.length > 1 ? (stepIdx / (steps.length - 1)) * 100 : 0;

  return (
    <div className="left-panel fade-in">
      {/* Input Card */}
      <div className="card">
        <div className="card-header">
          <span className="card-title"><span className="card-title-icon">⚙️</span>Array Input</span>
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {PRESETS.map(p => (
              <button key={p.label} className="btn btn-sm" onClick={() => handlePreset(p)}>{p.label}</button>
            ))}
          </div>
        </div>
        <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div className="array-input-row">
            <input
              className="array-input"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              placeholder="64, 25, 12, 22, 11..."
              onKeyDown={e => e.key === 'Enter' && handleApply()}
            />
            <button className="btn btn-primary" onClick={handleApply}>Visualize →</button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Mode:</span>
            {['random', 'best', 'worst'].map(mode => (
              <button
                key={mode}
                onClick={() => handleCaseToggle(mode)}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: '99px',
                  border: `1px solid ${caseMode === mode ? 'currentColor' : 'var(--border-mid)'}`,
                  background: caseMode === mode ? (mode === 'best' ? 'rgba(16,185,129,0.15)' : mode === 'worst' ? 'rgba(244,63,94,0.15)' : 'rgba(99,102,241,0.15)') : 'var(--bg-elevated)',
                  color: caseMode === mode ? (mode === 'best' ? 'var(--accent-emerald)' : mode === 'worst' ? 'var(--accent-rose)' : 'var(--accent-primary)') : 'var(--text-muted)',
                  fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)',
                  transition: 'all 0.15s ease',
                }}
              >
                {mode === 'random' ? '🎲 Random' : mode === 'best' ? '🌟 Best Case' : '💀 Worst Case'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Visualizer */}
      <div className="card">
        <div className="card-header">
          <span className="card-title">
            <span className="card-title-icon">📊</span>
            Bar Chart Visualizer
            {gap !== undefined && gap > 0 && <span className="gap-indicator" style={{ marginLeft: 8 }}>Gap: {gap}</span>}
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
            {array.length} elements
          </span>
        </div>

        <div className="visualizer-canvas">
          {array.map((val, idx) => (
            <div key={idx} className="bar-wrapper">
              <div
                className={`bar ${getBarClass(idx)}`}
                style={{ height: `${Math.max((val / maxVal) * 100, 3)}%` }}
                data-tooltip={`[${idx}]=${val}`}
              />
              <span className="bar-label">{val}</span>
            </div>
          ))}
        </div>

        <div className="legend">
          {[
            { label: 'Comparing', color: '#f43f5e' },
            { label: 'Swapping', color: '#f59e0b' },
            { label: 'Sorted ✓', color: '#10b981' },
            { label: 'Pivot', color: '#a78bfa' },
            { label: 'Unsorted', color: '#3b82f6' },
          ].map(l => (
            <div key={l.label} className="legend-item">
              <div className="legend-dot" style={{ background: l.color }} />
              {l.label}
            </div>
          ))}
        </div>

        <div style={{ padding: '0 1.25rem 1rem' }}>
          <div className={`commentary-box ${commentUpdating ? 'updating' : ''}`}>
            <span style={{ color: 'var(--text-primary)' }}>{comment}</span>
          </div>
        </div>

        <div className="controls-bar">
          <button className="btn btn-icon" onClick={() => { setIsPlaying(false); setStepIdx(0); }} data-tooltip="Reset" disabled={stepIdx === 0 && !isPlaying}>⏮</button>
          <button className="btn btn-icon" onClick={() => setStepIdx(p => Math.max(p - 1, 0))} disabled={stepIdx === 0}>◀</button>
          <button className="btn btn-icon play-pause" onClick={() => setIsPlaying(p => !p)}>
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button className="btn btn-icon" onClick={() => setStepIdx(p => Math.min(p + 1, steps.length - 1))} disabled={stepIdx === steps.length - 1}>▶</button>
          <button className="btn btn-icon" onClick={() => setStepIdx(steps.length - 1)} data-tooltip="Skip to end">⏭</button>

          <div className="speed-control">
            <span className="speed-label">Speed</span>
            <input type="range" min="0.1" max="5" step="0.1" value={speed} onChange={e => setSpeed(Number(e.target.value))} />
            <span className="speed-value">{speed.toFixed(1)}x</span>
          </div>
        </div>

        <div className="step-progress">
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="step-counter">Step {stepIdx + 1} / {steps.length}</span>
        </div>
      </div>
    </div>
  );
}
