import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALGORITHMS, generateExamTrace, stringToArray, arrayToString } from '../algorithms';

const DEFAULT_STRINGS = {
    selection: 'ZHONGQIAO',
    insertion: 'SORTING',
    shell: 'ALGORITHM',
    merge: 'MERGESORT',
    quick: 'QUICKSORT',
};

export default function ExamMode({ algoId }) {
    const algo = ALGORITHMS[algoId];
    const [inputStr, setInputStr] = useState(DEFAULT_STRINGS[algoId] || 'SORTING');
    const [examRows, setExamRows] = useState([]); // { array, lo, mid, hi, gap }
    const [userGrid, setUserGrid] = useState([]); // 2D: userGrid[row][col] = { value, status }
    const [activeRow, setActiveRow] = useState(1); // row user is working on (0 is the initial display)
    const [isDone, setIsDone] = useState(false);
    const [hintCount, setHintCount] = useState(0);
    const [errorMsg, setErrorMsg] = useState('');
    const [celebrating, setCelebrating] = useState(false);
    const inputRefs = useRef({});

    const strToCharArray = (s) => s.toUpperCase().replace(/[^A-Z]/g, '').split('');

    const buildExam = useCallback((str) => {
        const chars = strToCharArray(str);
        if (chars.length < 2) return;
        const numericArr = chars.map(c => c.charCodeAt(0) - 64);
        const rows = generateExamTrace(algoId, numericArr);
        // Convert numeric rows back to characters
        const charRows = rows.map(r => ({
            ...r,
            display: r.array.map(n => String.fromCharCode(n + 64)),
        }));
        setExamRows(charRows);

        // Init user grid: row 0 is the original (read-only shown to user), rest are empty inputs
        const grid = charRows.map((row, ri) => {
            if (ri === 0) {
                // First row fully revealed
                return row.display.map(ch => ({ value: ch, status: 'readonly' }));
            }
            if (ri === charRows.length - 1) {
                // Last row: fully hidden
                return row.display.map(() => ({ value: '', status: 'empty' }));
            }
            return row.display.map(() => ({ value: '', status: 'empty' }));
        });
        setUserGrid(grid);
        setActiveRow(1);
        setIsDone(false);
        setHintCount(0);
        setErrorMsg('');
    }, [algoId]);

    useEffect(() => {
        buildExam(DEFAULT_STRINGS[algoId] || 'SORTING');
        setInputStr(DEFAULT_STRINGS[algoId] || 'SORTING');
    }, [algoId]); // eslint-disable-line

    const handleCellChange = (row, col, val) => {
        const ch = val.toUpperCase().replace(/[^A-Z]/g, '').slice(-1);
        setUserGrid(prev => {
            const next = prev.map(r => r.map(c => ({ ...c })));
            next[row][col].value = ch;
            next[row][col].status = ch ? 'filled' : 'empty';
            return next;
        });
        setErrorMsg('');

        // Auto-advance to next cell
        if (ch && col < examRows[row].display.length - 1) {
            const nextRef = inputRefs.current[`${row}-${col + 1}`];
            if (nextRef) nextRef.focus();
        }
    };

    const validateRow = (row) => {
        if (row >= examRows.length) return;
        const correct = examRows[row].display;
        const user = userGrid[row].map(c => c.value);

        setUserGrid(prev => {
            const next = prev.map(r => r.map(c => ({ ...c })));
            let allCorrect = true;
            for (let col = 0; col < correct.length; col++) {
                if (user[col] === correct[col]) {
                    next[row][col].status = 'correct';
                } else {
                    next[row][col].status = 'wrong';
                    allCorrect = false;
                }
            }
            return next;
        });

        const allCorrect = user.every((ch, i) => ch === correct[i]);

        if (allCorrect) {
            if (row === examRows.length - 1) {
                setIsDone(true);
                setCelebrating(true);
                setTimeout(() => setCelebrating(false), 2000);
            } else {
                setActiveRow(row + 1);
                // auto-focus first input of next row
                setTimeout(() => {
                    const ref = inputRefs.current[`${row + 1}-0`];
                    if (ref) ref.focus();
                }, 100);
            }
        } else {
            setErrorMsg(`Row ${row} has errors highlighted in red. Fix them and try again.`);
        }
    };

    const handleHint = () => {
        if (activeRow >= examRows.length) return;
        const correct = examRows[activeRow].display;
        const user = userGrid[activeRow];
        // Find first wrong/empty cell
        const idx = user.findIndex((c, i) => c.value !== correct[i]);
        if (idx === -1) return;
        setUserGrid(prev => {
            const next = prev.map(r => r.map(c => ({ ...c })));
            next[activeRow][idx].value = correct[idx];
            next[activeRow][idx].status = 'hint';
            return next;
        });
        setHintCount(p => p + 1);
        setErrorMsg('');
    };

    const handleRevealRow = () => {
        if (activeRow >= examRows.length) return;
        const correct = examRows[activeRow].display;
        setUserGrid(prev => {
            const next = prev.map(r => r.map(c => ({ ...c })));
            next[activeRow] = correct.map(ch => ({ value: ch, status: 'hint' }));
            return next;
        });
        setActiveRow(p => Math.min(p + 1, examRows.length - 1));
        setHintCount(h => h + correct.length);
        setErrorMsg('');
    };

    const hasLoMidHi = algo.hasLoMidHi;

    if (examRows.length === 0) return (
        <div className="card"><div className="empty-state"><div className="empty-icon">📝</div>Loading exam...</div></div>
    );

    const cols = examRows[0]?.display.length || 0;

    return (
        <div className="exam-panel fade-in">
            {/* Input Section */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title"><span className="card-title-icon">🎓</span>Exam Mode — Manual Trace</span>
                    <span className="exam-mode-badge">Worksheet</span>
                </div>
                <div className="card-body">
                    <div className="exam-input-section">
                        <input
                            className="array-input exam-string-input"
                            style={{ maxWidth: 280 }}
                            value={inputStr}
                            onChange={e => setInputStr(e.target.value.toUpperCase().replace(/[^A-Z]/g, ''))}
                            placeholder="Enter a word (A-Z only)..."
                            maxLength={25}
                        />
                        <button className="btn btn-primary" onClick={() => buildExam(inputStr)}>
                            🔄 Generate Worksheet
                        </button>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            {cols} characters • {examRows.length} steps
                        </span>
                    </div>
                    <div className="exam-controls" style={{ marginTop: '0.75rem' }}>
                        <button className="btn" onClick={handleHint} disabled={isDone}>
                            💡 Show Hint <span className="hint-counter">({hintCount} used)</span>
                        </button>
                        <button className="btn" onClick={handleRevealRow} disabled={isDone}>
                            👁 Reveal Row
                        </button>
                        <button className="btn btn-danger" onClick={() => buildExam(inputStr)}>
                            🔄 Reset
                        </button>
                        {errorMsg && (
                            <span style={{ fontSize: '0.78rem', color: 'var(--accent-rose)', marginLeft: '0.5rem' }}>
                                ⚠️ {errorMsg}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Done Banner */}
            {isDone && (
                <div className="done-banner">
                    <div className="done-emoji">{celebrating ? '🎉' : '✅'}</div>
                    <div>
                        <div className="done-text">Done! 🎊</div>
                        <div className="done-sub">
                            You completed the {algo.info.name} worksheet with {hintCount} hint{hintCount !== 1 ? 's' : ''}!
                        </div>
                    </div>
                </div>
            )}

            {/* Trace Grid */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title"><span className="card-title-icon">📋</span>Trace Table</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--accent-rose)' }} /><span style={{ fontSize: '0.7rem' }}>Wrong</span></div>
                        <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--accent-emerald)' }} /><span style={{ fontSize: '0.7rem' }}>Correct</span></div>
                        <div className="legend-item"><div className="legend-dot" style={{ background: 'var(--accent-amber)' }} /><span style={{ fontSize: '0.7rem' }}>Hint</span></div>
                    </div>
                </div>
                <div className="trace-grid-wrapper">
                    <table className="trace-grid">
                        <thead>
                            <tr>
                                <th>Step</th>
                                {Array.from({ length: cols }, (_, i) => <th key={i}>[{i}]</th>)}
                                {hasLoMidHi && <th>lo</th>}
                                {hasLoMidHi && <th>{algoId === 'quick' ? 'pivot' : 'mid'}</th>}
                                {hasLoMidHi && <th>hi</th>}
                                {algoId === 'shell' && <th>gap</th>}
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {examRows.map((row, ri) => {
                                const isActive = ri === activeRow;
                                const isComplete = ri < activeRow || isDone;
                                const isLocked = ri > activeRow && !isDone;
                                const isReadOnly = ri === 0;

                                let rowClass = '';
                                if (isComplete && !isActive) rowClass = 'row-complete';
                                else if (isActive) rowClass = 'row-active';
                                else if (isLocked) rowClass = 'row-locked';

                                return (
                                    <tr key={ri} className={rowClass}>
                                        <td>
                                            <span className="step-num">
                                                {ri === 0 ? 'Init' : ri === examRows.length - 1 ? 'Final' : `P${ri}`}
                                            </span>
                                        </td>
                                        {Array.from({ length: cols }, (_, ci) => {
                                            const cell = userGrid[ri]?.[ci] || { value: '', status: 'empty' };
                                            const cellStatus = isReadOnly ? 'readonly' : cell.status;

                                            return (
                                                <td key={ci}>
                                                    <input
                                                        ref={el => { if (el) inputRefs.current[`${ri}-${ci}`] = el; }}
                                                        className={`trace-cell-input ${cellStatus}`}
                                                        maxLength={1}
                                                        value={cell.value}
                                                        readOnly={isReadOnly || isLocked || (isComplete && !isActive)}
                                                        disabled={isLocked}
                                                        onChange={e => handleCellChange(ri, ci, e.target.value)}
                                                        onKeyDown={e => {
                                                            if (e.key === 'Enter') validateRow(ri);
                                                            if (e.key === 'Backspace' && !cell.value && ci > 0) {
                                                                inputRefs.current[`${ri}-${ci - 1}`]?.focus();
                                                            }
                                                        }}
                                                    />
                                                </td>
                                            );
                                        })}
                                        {hasLoMidHi && (
                                            <>
                                                <td><span className="meta-cell">{row.lo ?? '—'}</span></td>
                                                <td><span className="meta-cell">{row.mid ?? '—'}</span></td>
                                                <td><span className="meta-cell">{row.hi ?? '—'}</span></td>
                                            </>
                                        )}
                                        {algoId === 'shell' && (
                                            <td><span className="meta-cell">{row.gap ?? '—'}</span></td>
                                        )}
                                        <td>
                                            {isActive && !isDone ? (
                                                <button className="btn btn-sm btn-primary" onClick={() => validateRow(ri)}>
                                                    Check ✓
                                                </button>
                                            ) : isReadOnly ? (
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Original</span>
                                            ) : isComplete ? (
                                                <span style={{ fontSize: '0.7rem', color: 'var(--accent-emerald)' }}>✅</span>
                                            ) : (
                                                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>🔒</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div style={{ padding: '0.875rem 1.25rem', borderTop: '1px solid var(--border-subtle)' }}>
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                        💡 <strong style={{ color: 'var(--text-secondary)' }}>Instructions:</strong> Fill in the array state after each sorting step.
                        Press <kbd style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-mid)', padding: '0 4px', borderRadius: '3px', fontSize: '0.7rem' }}>Enter</kbd> or click <strong style={{ color: 'var(--text-secondary)' }}>Check ✓</strong> to validate the row.
                        Use <strong style={{ color: 'var(--accent-amber)' }}>Show Hint</strong> to reveal one character at a time.
                    </p>
                </div>
            </div>
        </div>
    );
}
