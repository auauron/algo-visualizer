import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALGORITHMS, generateBestCase, generateWorstCase } from '../algorithms';

const PRESETS = [
    { label: 'Random 12', values: () => Array.from({ length: 12 }, () => Math.floor(Math.random() * 95) + 5) },
    { label: 'Random 8', values: () => Array.from({ length: 8 }, () => Math.floor(Math.random() * 95) + 5) },
    { label: 'Reverse 10', values: () => Array.from({ length: 10 }, (_, i) => 100 - i * 9) },
    { label: 'Nearly Sorted', values: () => [10, 20, 30, 40, 60, 50, 70, 90, 80, 100] },
];

export default function WatchMode({ algoId }) {
    const algo = ALGORITHMS[algoId];
    const [inputText, setInputText] = useState('64,25,12,22,11,78,43,56,31,88');
    const [steps, setSteps] = useState([]);
    const [stepIdx, setStepIdx] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speed, setSpeed] = useState(1);
    const [caseMode, setCaseMode] = useState('random');
    const [commentUpdating, setCommentUpdating] = useState(false);
    const intervalRef = useRef(null);
    const prevComment = useRef('');

    const parseInput = useCallback((text) => {
        const nums = text.split(/[\s,]+/).map(Number).filter(n => !isNaN(n) && n > 0);
        return nums.length >= 2 ? nums : null;
    }, []);

    const buildSteps = useCallback((inputArr) => {
        const s = algo.generateSteps([...inputArr]);
        setSteps(s);
        setStepIdx(0);
        setIsPlaying(false);
    }, [algo]);

    useEffect(() => {
        const nums = parseInput(inputText);
        if (nums) buildSteps(nums);
    }, [algoId]); // eslint-disable-line

    const currentStep = steps[stepIdx] || null;

    // Auto-play
    useEffect(() => {
        if (!isPlaying) {
            clearInterval(intervalRef.current);
            return;
        }
        intervalRef.current = setInterval(() => {
            setStepIdx(prev => {
                if (prev >= steps.length - 1) {
                    setIsPlaying(false);
                    return prev;
                }
                return prev + 1;
            });
        }, Math.round(800 / speed));
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, speed, steps.length]);

    // Comment flash animation
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

        if (caseMode === 'best') nums = generateBestCase(nums);
        else if (caseMode === 'worst') nums = generateWorstCase(nums);

        buildSteps(nums);
    };

    const handlePreset = (preset) => {
        const nums = preset.values();
        const text = nums.join(', ');
        setInputText(text);
        buildSteps(nums);
        setCaseMode('random');
    };

    const handleCaseToggle = (mode) => {
        setCaseMode(mode);
        const nums = parseInput(inputText);
        if (!nums) return;
        let processed = [...nums];
        if (mode === 'best') processed = generateBestCase(nums);
        else if (mode === 'worst') processed = generateWorstCase(nums);
        buildSteps(processed);
    };

    const stepForward = () => setStepIdx(p => Math.min(p + 1, steps.length - 1));
    const stepBackward = () => setStepIdx(p => Math.max(p - 1, 0));
    const togglePlay = () => setIsPlaying(p => !p);
    const reset = () => { setIsPlaying(false); setStepIdx(0); };

    if (!currentStep) {
        return (
            <div className="left-panel">
                <div className="card">
                    <div className="card-body">
                        <div className="empty-state">
                            <div className="empty-icon">📊</div>
                            <div className="empty-text">Enter valid numbers above to start visualization.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const { array, comparing, swapping, sorted, comment, codeLine, gap, pivot } = currentStep;
    const maxVal = Math.max(...array);

    const getBarClass = (idx) => {
        if (sorted.includes(idx)) return 'bar-sorted';
        if (swapping.includes(idx)) return 'bar-swap';
        if (comparing.includes(idx)) return 'bar-compare';
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
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
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
                            placeholder="Enter comma-separated numbers, e.g., 64, 25, 12, 22, 11"
                            onKeyDown={e => e.key === 'Enter' && handleApply()}
                        />
                        <button className="btn btn-primary" onClick={handleApply}>Visualize →</button>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Input mode:</span>
                        {['random', 'best', 'worst'].map(mode => (
                            <button
                                key={mode}
                                className={`case-badge ${mode} ${caseMode === mode ? 'active' : ''}`}
                                style={{ cursor: 'pointer', fontFamily: 'var(--font-sans)', border: '1px solid', opacity: caseMode === mode ? 1 : 0.6 }}
                                onClick={() => handleCaseToggle(mode)}
                            >
                                {mode === 'random' ? '🎲 Random' : mode === 'best' ? '🌟 Best Case' : '💀 Worst Case'}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Visualizer Card */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title">
                        <span className="card-title-icon">📊</span>
                        Visualizer
                        {gap !== undefined && gap > 0 && (
                            <span className="gap-indicator" style={{ marginLeft: '0.5rem' }}>Gap: {gap}</span>
                        )}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                        {array.length} elements
                    </span>
                </div>

                {/* Bar Chart */}
                <div className="visualizer-canvas">
                    {array.map((val, idx) => (
                        <div key={idx} className="bar-wrapper">
                            <div
                                className={`bar ${getBarClass(idx)}`}
                                style={{ height: `${(val / maxVal) * 100}%` }}
                                data-tooltip={`[${idx}] = ${val}`}
                            />
                            <span className="bar-label">{val}</span>
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="legend">
                    {[
                        { cls: 'bar-compare', label: 'Comparing', color: '#f43f5e' },
                        { cls: 'bar-swap', label: 'Swapping / Moving', color: '#f59e0b' },
                        { cls: 'bar-sorted', label: 'Sorted', color: '#10b981' },
                        { cls: 'bar-pivot', label: 'Pivot', color: '#a78bfa' },
                        { cls: 'bar-default', label: 'Unsorted', color: '#3b82f6' },
                    ].map(l => (
                        <div key={l.label} className="legend-item">
                            <div className="legend-dot" style={{ background: l.color }} />
                            {l.label}
                        </div>
                    ))}
                </div>

                {/* Commentary */}
                <div style={{ padding: '0 1.25rem 1rem' }}>
                    <div className={`commentary-box ${commentUpdating ? 'updating' : ''}`}>
                        {comment}
                    </div>
                </div>

                {/* Controls */}
                <div className="controls-bar">
                    <button className="btn btn-icon" onClick={reset} data-tooltip="Reset" disabled={stepIdx === 0 && !isPlaying}>⏮</button>
                    <button className="btn btn-icon" onClick={stepBackward} disabled={stepIdx === 0}>◀</button>
                    <button className="btn btn-icon play-pause" onClick={togglePlay}>
                        {isPlaying ? '⏸' : '▶'}
                    </button>
                    <button className="btn btn-icon" onClick={stepForward} disabled={stepIdx === steps.length - 1}>▶</button>
                    <button className="btn btn-icon" onClick={() => setStepIdx(steps.length - 1)} data-tooltip="Jump to end">⏭</button>

                    <div className="speed-control">
                        <span className="speed-label">Speed</span>
                        <input
                            type="range"
                            min="0.1"
                            max="5"
                            step="0.1"
                            value={speed}
                            onChange={e => setSpeed(Number(e.target.value))}
                        />
                        <span className="speed-value">{speed.toFixed(1)}x</span>
                    </div>
                </div>

                {/* Progress */}
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
