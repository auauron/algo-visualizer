import React, { useState } from 'react';
import { ALGORITHMS } from '../algorithms';

export default function Sidebar({ algoId, currentStep }) {
    const algo = ALGORITHMS[algoId];
    const { info, pseudocode } = algo;
    const [caseView, setCaseView] = useState('best');

    const codeLine = currentStep?.codeLine ?? -1;

    const getComplexityClass = (val) => {
        if (val.includes('n²')) return 'on2';
        if (val.includes('n log')) return 'onlogn';
        if (val === 'O(n)') return 'on';
        return '';
    };

    return (
        <div className="right-sidebar">
            {/* Algorithm DNA */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title"><span className="card-title-icon">🧬</span>Algorithm DNA</span>
                    <span className={`stable-badge ${info.stable ? 'stable' : 'unstable'}`}>
                        {info.stable ? '✓ Stable' : '✗ Unstable'}
                    </span>
                </div>
                <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                    <div className="complexity-grid">
                        <div className="complexity-item">
                            <div className="complexity-label">Best Case</div>
                            <div className={`complexity-value ${getComplexityClass(info.timeBest)}`}>{info.timeBest}</div>
                        </div>
                        <div className="complexity-item">
                            <div className="complexity-label">Average Case</div>
                            <div className={`complexity-value ${getComplexityClass(info.timeAvg)}`}>{info.timeAvg}</div>
                        </div>
                        <div className="complexity-item">
                            <div className="complexity-label">Worst Case</div>
                            <div className={`complexity-value ${getComplexityClass(info.timeWorst)}`}>{info.timeWorst}</div>
                        </div>
                        <div className="complexity-item">
                            <div className="complexity-label">Space</div>
                            <div className={`complexity-value space`}>{info.space}</div>
                        </div>
                    </div>
                    <p className="algo-description" style={{ padding: 0 }}>{info.description}</p>
                </div>
            </div>

            {/* Live Pseudocode */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title"><span className="card-title-icon">📟</span>Live Pseudocode</span>
                    {codeLine >= 0 && (
                        <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)', background: 'rgba(99,102,241,0.1)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                            Line {codeLine + 1}
                        </span>
                    )}
                </div>
                <div className="card-body" style={{ padding: '0.5rem 0' }}>
                    <div className="pseudocode-panel">
                        {pseudocode.map((line, i) => (
                            <div
                                key={i}
                                className={`pseudo-line ${i === codeLine ? 'active' : i === codeLine - 1 ? 'prev-active' : ''}`}
                            >
                                {line}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Best / Worst Case Toggle */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title"><span className="card-title-icon">⚖️</span>Case Analysis</span>
                </div>
                <div className="card-body">
                    <div className="case-toggle">
                        <button
                            className={`case-toggle-btn ${caseView === 'best' ? 'active' : ''}`}
                            onClick={() => setCaseView('best')}
                        >
                            🌟 Best Case
                        </button>
                        <button
                            className={`case-toggle-btn ${caseView === 'worst' ? 'active' : ''}`}
                            onClick={() => setCaseView('worst')}
                        >
                            💀 Worst Case
                        </button>
                    </div>
                    <div className="case-desc">
                        {caseView === 'best' ? info.bestCase : info.worstCase}
                    </div>
                </div>
            </div>

            {/* Step Info */}
            {currentStep && (
                <div className="card">
                    <div className="card-header">
                        <span className="card-title"><span className="card-title-icon">🔍</span>Current State</span>
                    </div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                        {currentStep.comparing?.length > 0 && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                <strong style={{ color: 'var(--color-compare)' }}>Comparing:</strong> indices [{currentStep.comparing.join(', ')}]
                            </div>
                        )}
                        {currentStep.swapping?.length > 0 && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                <strong style={{ color: 'var(--color-swap)' }}>Moving:</strong> indices [{currentStep.swapping.join(', ')}]
                            </div>
                        )}
                        {currentStep.sorted?.length > 0 && (
                            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                                <strong style={{ color: 'var(--color-sorted)' }}>Sorted:</strong> {currentStep.sorted.length} element{currentStep.sorted.length !== 1 ? 's' : ''}
                            </div>
                        )}
                        {(currentStep.lo !== undefined || currentStep.mid !== undefined || currentStep.hi !== undefined) && (
                            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                {currentStep.lo !== undefined && (
                                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', color: 'var(--accent-cyan)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                        lo={currentStep.lo}
                                    </span>
                                )}
                                {currentStep.mid !== undefined && (
                                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'rgba(167,139,250,0.1)', border: '1px solid rgba(167,139,250,0.2)', color: 'var(--accent-violet)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                        mid={currentStep.mid}
                                    </span>
                                )}
                                {currentStep.hi !== undefined && (
                                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', color: 'var(--accent-amber)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                                        hi={currentStep.hi}
                                    </span>
                                )}
                            </div>
                        )}
                        {currentStep.gap !== undefined && currentStep.gap > 0 && (
                            <span className="gap-indicator">Gap: {currentStep.gap}</span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
