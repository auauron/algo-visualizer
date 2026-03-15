import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    QUIZ_QUESTIONS,
    ALGO_FILTER_OPTIONS,
    DIFFICULTY_COLORS,
    CATEGORY_COLORS,
} from '../data/quizBank';

// ── Utility ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const ALGO_LABELS = {
    selection: 'Selection Sort',
    insertion: 'Insertion Sort',
    shell: 'Shell Sort',
    merge: 'Merge Sort',
    quick: 'Quick Sort',
};

// ── Sub-components ────────────────────────────────────────────────────────────
function ScoreBadge({ score, total }) {
    const pct = total === 0 ? 0 : Math.round((score / total) * 100);
    const color = pct >= 80 ? '#10b981' : pct >= 60 ? '#f59e0b' : '#f43f5e';
    return (
        <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: `rgba(${pct >= 80 ? '16,185,129' : pct >= 60 ? '245,158,11' : '244,63,94'},0.1)`,
            border: `1px solid ${color}33`,
            borderRadius: '99px', padding: '0.35rem 0.875rem',
            fontSize: '0.78rem', fontWeight: 700, color,
            fontFamily: 'var(--font-mono)',
        }}>
            <span>Score</span>
            <span>{score}/{total}</span>
            {total > 0 && <span style={{ opacity: 0.7 }}>({pct}%)</span>}
        </div>
    );
}

function ProgressBar({ current, total }) {
    const pct = total === 0 ? 0 : (current / total) * 100;
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ flex: 1, height: 4, background: 'var(--bg-elevated)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: 'var(--gradient-primary)', borderRadius: 99, transition: 'width 0.3s ease' }} />
            </div>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                {current} / {total}
            </span>
        </div>
    );
}

function DifficultyBadge({ difficulty }) {
    const d = DIFFICULTY_COLORS[difficulty];
    return (
        <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: 99, background: d.bg, border: `1px solid ${d.border}`, color: d.color }}>
            {d.label}
        </span>
    );
}

function CategoryBadge({ category }) {
    const c = CATEGORY_COLORS[category] || { color: 'var(--text-muted)', bg: 'var(--bg-elevated)' };
    return (
        <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: 4, background: c.bg, color: c.color, border: `1px solid ${c.color}33` }}>
            {category}
        </span>
    );
}

function AlgoBadge({ algo }) {
    return (
        <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.625rem', borderRadius: 4, background: 'var(--bg-elevated)', color: 'var(--text-secondary)', border: '1px solid var(--border-mid)' }}>
            {ALGO_LABELS[algo] || algo}
        </span>
    );
}

// ── Result Screen ─────────────────────────────────────────────────────────────
function ResultScreen({ score, total, history, onRestart, onReview }) {
    const pct = Math.round((score / total) * 100);
    const grade = pct >= 90 ? { emoji: '🏆', label: 'Outstanding!', sub: "You've mastered the material!" }
        : pct >= 75 ? { emoji: '🎉', label: 'Great Work!', sub: "Strong grasp of the algorithms." }
            : pct >= 60 ? { emoji: '📚', label: 'Good Effort!', sub: "Review the explanations below." }
                : { emoji: '💪', label: 'Keep Going!', sub: "Re-read the Sedgewick slides and try again." };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', animation: 'fadeIn 0.4s ease' }}>
            {/* Hero */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))',
                border: '1px solid rgba(99,102,241,0.25)',
                borderRadius: 'var(--radius-lg)',
                padding: '2.5rem',
                textAlign: 'center',
            }}>
                <div style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>{grade.emoji}</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, background: 'var(--gradient-primary)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.25rem' }}>
                    {grade.label}
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>{grade.sub}</div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                    {[
                        { label: 'Score', value: `${score}/${total}`, color: 'var(--accent-primary)' },
                        { label: 'Accuracy', value: `${pct}%`, color: pct >= 70 ? 'var(--accent-emerald)' : 'var(--accent-rose)' },
                        { label: 'Correct', value: score, color: 'var(--accent-emerald)' },
                        { label: 'Wrong', value: total - score, color: 'var(--accent-rose)' },
                    ].map(s => (
                        <div key={s.label} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: s.color, fontFamily: 'var(--font-mono)' }}>{s.value}</div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={onRestart} style={{ minWidth: 140 }}>🔄 New Quiz</button>
                <button className="btn" onClick={onReview} style={{ minWidth: 140 }}>🔍 Review Answers</button>
            </div>

            {/* Per-question summary */}
            <div className="card">
                <div className="card-header">
                    <span className="card-title"><span className="card-title-icon">📋</span>Question Summary</span>
                </div>
                <div style={{ padding: '0.75rem' }}>
                    {history.map((h, i) => (
                        <div key={i} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.625rem 0.5rem',
                            borderBottom: i < history.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                        }}>
                            <span style={{ fontSize: '1.1rem', flexShrink: 0 }}>{h.correct ? '✅' : '❌'}</span>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--text-primary)', lineHeight: 1.5, marginBottom: '0.25rem' }}>
                                    {h.question.question}
                                </div>
                                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                    <AlgoBadge algo={h.question.algo} />
                                    <DifficultyBadge difficulty={h.question.difficulty} />
                                    <CategoryBadge category={h.question.category} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ── Review Screen ─────────────────────────────────────────────────────────────
function ReviewScreen({ history, onBack }) {
    const [open, setOpen] = useState(null);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <button className="btn" onClick={onBack}>← Back to Results</button>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Answer Review</h2>
            </div>
            {history.map((h, i) => (
                <div key={i} className="card" style={{ borderColor: h.correct ? 'rgba(16,185,129,0.3)' : 'rgba(244,63,94,0.2)' }}>
                    <div
                        className="card-header"
                        style={{ cursor: 'pointer', userSelect: 'none' }}
                        onClick={() => setOpen(open === i ? null : i)}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', flex: 1, minWidth: 0 }}>
                            <span style={{ fontSize: '1rem' }}>{h.correct ? '✅' : '❌'}</span>
                            <span style={{ fontSize: '0.82rem', color: 'var(--text-primary)', flex: 1 }}>
                                Q{i + 1}. {h.question.question}
                            </span>
                        </div>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{open === i ? '▲' : '▼'}</span>
                    </div>
                    {open === i && (
                        <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.875rem', borderTop: '1px solid var(--border-subtle)' }}>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                <AlgoBadge algo={h.question.algo} />
                                <DifficultyBadge difficulty={h.question.difficulty} />
                                <CategoryBadge category={h.question.category} />
                            </div>
                            {h.question.options.map((opt, oi) => (
                                <div key={oi} style={{
                                    padding: '0.5rem 0.875rem',
                                    borderRadius: 'var(--radius-sm)',
                                    border: `1px solid ${oi === h.question.correctIndex ? 'rgba(16,185,129,0.4)' : oi === h.chosen ? 'rgba(244,63,94,0.4)' : 'var(--border-subtle)'}`,
                                    background: oi === h.question.correctIndex ? 'rgba(16,185,129,0.08)' : oi === h.chosen && !h.correct ? 'rgba(244,63,94,0.08)' : 'transparent',
                                    fontSize: '0.82rem',
                                    color: oi === h.question.correctIndex ? 'var(--accent-emerald)' : oi === h.chosen && !h.correct ? 'var(--accent-rose)' : 'var(--text-secondary)',
                                }}>
                                    {oi === h.question.correctIndex ? '✓ ' : oi === h.chosen && !h.correct ? '✗ ' : '  '}
                                    {opt}
                                </div>
                            ))}
                            <div style={{
                                background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)',
                                borderRadius: 'var(--radius-md)', padding: '0.875rem 1rem',
                            }}>
                                <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
                                    💡 Explanation
                                </div>
                                <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.7, margin: 0 }}>
                                    {h.question.explanation}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ── Main QuizMode ─────────────────────────────────────────────────────────────
export default function QuizMode() {
    const [phase, setPhase] = useState('setup');     // 'setup' | 'quiz' | 'result' | 'review'
    const [algoFilter, setAlgoFilter] = useState('all');
    const [diffFilter, setDiffFilter] = useState('all');
    const [questionCount, setQuestionCount] = useState(10);

    // Quiz state
    const [questions, setQuestions] = useState([]);
    const [qIdx, setQIdx] = useState(0);
    const [chosen, setChosen] = useState(null);     // index of selected option
    const [revealed, setRevealed] = useState(false);    // show answer?
    const [score, setScore] = useState(0);
    const [history, setHistory] = useState([]);       // [{ question, chosen, correct }]
    const [streak, setStreak] = useState(0);
    const [hintShown, setHintShown] = useState(false);
    const [animKey, setAnimKey] = useState(0);
    const topRef = useRef(null);

    const startQuiz = useCallback(() => {
        let pool = QUIZ_QUESTIONS;
        if (algoFilter !== 'all') pool = pool.filter(q => q.algo === algoFilter);
        if (diffFilter !== 'all') pool = pool.filter(q => q.difficulty === diffFilter);
        if (pool.length === 0) return;

        const shuffled = shuffle(pool).slice(0, Math.min(questionCount, pool.length));
        setQuestions(shuffled);
        setQIdx(0);
        setChosen(null);
        setRevealed(false);
        setScore(0);
        setHistory([]);
        setStreak(0);
        setHintShown(false);
        setAnimKey(k => k + 1);
        setPhase('quiz');
    }, [algoFilter, diffFilter, questionCount]);

    const currentQ = questions[qIdx];

    const handleChoose = (optIdx) => {
        if (revealed) return;
        setChosen(optIdx);
    };

    const handleSubmit = () => {
        if (chosen === null || revealed) return;
        const correct = chosen === currentQ.correctIndex;
        setRevealed(true);
        if (correct) {
            setScore(s => s + 1);
            setStreak(s => s + 1);
        } else {
            setStreak(0);
        }
        setHistory(h => [...h, { question: currentQ, chosen, correct }]);
        topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const handleNext = () => {
        if (qIdx >= questions.length - 1) {
            setPhase('result');
        } else {
            setQIdx(i => i + 1);
            setChosen(null);
            setRevealed(false);
            setHintShown(false);
            setAnimKey(k => k + 1);
            topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const handleHint = () => {
        setHintShown(true);
    };

    // ── Setup Screen ─────────────────────────────
    if (phase === 'setup') {
        const filteredCount = QUIZ_QUESTIONS
            .filter(q => algoFilter === 'all' || q.algo === algoFilter)
            .filter(q => diffFilter === 'all' || q.difficulty === diffFilter).length;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: 680, animation: 'fadeIn 0.3s ease' }}>
                {/* Title Card */}
                <div className="card">
                    <div className="card-header">
                        <span className="card-title"><span className="card-title-icon">🧠</span>Quiz Mode — Algorithm Mastery</span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Sedgewick & Wayne · Ch 2.1 – 2.3</span>
                    </div>
                    <div className="card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
                            Configure your quiz below. Questions cover <strong style={{ color: 'var(--text-primary)' }}>Conceptual understanding</strong>, <strong style={{ color: 'var(--accent-cyan)' }}>Time/Space Complexity</strong>, <strong style={{ color: 'var(--accent-violet)' }}>Stability</strong>, and <strong style={{ color: 'var(--accent-amber)' }}>Java-Specific</strong> details — all drawn from the Sedgewick textbook.
                        </p>

                        {/* Algorithm Filter */}
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.625rem' }}>
                                Filter by Algorithm
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {ALGO_FILTER_OPTIONS.map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setAlgoFilter(opt.id)}
                                        className={`btn btn-sm ${algoFilter === opt.id ? 'btn-primary' : ''}`}
                                        style={{ fontFamily: 'var(--font-sans)' }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.625rem' }}>
                                Filter by Difficulty
                            </div>
                            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                                {[
                                    { id: 'all', label: '🎯 All Levels' },
                                    { id: 'easy', label: '⭐ Easy' },
                                    { id: 'medium', label: '⭐⭐ Medium' },
                                    { id: 'hard', label: '⭐⭐⭐ Hard' },
                                ].map(opt => (
                                    <button
                                        key={opt.id}
                                        onClick={() => setDiffFilter(opt.id)}
                                        className={`btn btn-sm ${diffFilter === opt.id ? 'btn-primary' : ''}`}
                                        style={{ fontFamily: 'var(--font-sans)' }}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Question Count */}
                        <div>
                            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.07em', marginBottom: '0.5rem' }}>
                                Number of Questions: <span style={{ color: 'var(--accent-primary)', fontFamily: 'var(--font-mono)' }}>{Math.min(questionCount, filteredCount)}</span>
                                <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}> (of {filteredCount} available)</span>
                            </div>
                            <input
                                type="range" min="5" max={filteredCount} step="1"
                                value={Math.min(questionCount, filteredCount)}
                                onChange={e => setQuestionCount(Number(e.target.value))}
                                style={{ width: '100%' }}
                            />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                                <span>5</span><span>{filteredCount}</span>
                            </div>
                        </div>

                        {/* Summary */}
                        <div style={{
                            display: 'flex', gap: '1rem', flexWrap: 'wrap',
                            background: 'var(--bg-elevated)', borderRadius: 'var(--radius-md)',
                            padding: '0.875rem', border: '1px solid var(--border-subtle)',
                        }}>
                            {[
                                { label: 'Questions', value: Math.min(questionCount, filteredCount) },
                                { label: 'Algorithm', value: algoFilter === 'all' ? 'All' : ALGO_LABELS[algoFilter] },
                                { label: 'Difficulty', value: diffFilter === 'all' ? 'All Levels' : diffFilter },
                            ].map(s => (
                                <div key={s.label}>
                                    <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--text-muted)' }}>{s.label}</div>
                                    <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>{s.value}</div>
                                </div>
                            ))}
                        </div>

                        <button
                            className="btn btn-primary"
                            onClick={startQuiz}
                            disabled={filteredCount === 0}
                            style={{ alignSelf: 'flex-start', padding: '0.75rem 2rem', fontSize: '0.9rem' }}
                        >
                            🚀 Start Quiz
                        </button>
                        {filteredCount === 0 && (
                            <p style={{ fontSize: '0.8rem', color: 'var(--accent-rose)' }}>No questions match your filters. Try "All Algorithms" or "All Levels".</p>
                        )}
                    </div>
                </div>

                {/* Stats card */}
                <div className="card">
                    <div className="card-header">
                        <span className="card-title"><span className="card-title-icon">📊</span>Question Bank Overview</span>
                    </div>
                    <div className="card-body">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.625rem' }}>
                            {Object.entries(ALGO_LABELS).map(([algoId, label]) => {
                                const count = QUIZ_QUESTIONS.filter(q => q.algo === algoId).length;
                                return (
                                    <div key={algoId} style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-sm)', padding: '0.625rem' }}>
                                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 2 }}>{label}</div>
                                        <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-primary)' }}>{count} Q</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (phase === 'result') {
        return <ResultScreen score={score} total={questions.length} history={history} onRestart={() => setPhase('setup')} onReview={() => setPhase('review')} />;
    }

    if (phase === 'review') {
        return <ReviewScreen history={history} onBack={() => setPhase('result')} />;
    }

    // ── Quiz Screen ──────────────────────────────
    if (!currentQ) return null;

    const isCorrect = revealed && chosen === currentQ.correctIndex;
    const isWrong = revealed && chosen !== currentQ.correctIndex;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 720, animation: 'fadeIn 0.25s ease' }} key={animKey}>
            <div ref={topRef} />

            {/* Top bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-sm" onClick={() => setPhase('setup')}>← Setup</button>
                <div style={{ flex: 1 }}>
                    <ProgressBar current={qIdx + (revealed ? 1 : 0)} total={questions.length} />
                </div>
                <ScoreBadge score={score} total={history.length} />
                {streak >= 2 && (
                    <span style={{ fontSize: '0.75rem', color: 'var(--accent-amber)', fontWeight: 700, background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', padding: '0.25rem 0.625rem', borderRadius: 99 }}>
                        🔥 {streak} streak
                    </span>
                )}
            </div>

            {/* Question Card */}
            <div className="card" style={{ borderColor: revealed ? (isCorrect ? 'rgba(16,185,129,0.4)' : 'rgba(244,63,94,0.3)') : 'var(--border-subtle)', transition: 'border-color 0.25s ease' }}>
                {/* Question Header */}
                <div className="card-header">
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginRight: '0.25rem' }}>
                            Q{qIdx + 1}
                        </span>
                        <AlgoBadge algo={currentQ.algo} />
                        <DifficultyBadge difficulty={currentQ.difficulty} />
                        <CategoryBadge category={currentQ.category} />
                    </div>
                </div>

                {/* Question Text */}
                <div style={{ padding: '1.25rem 1.5rem 1rem', fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.65 }}>
                    {currentQ.question}
                </div>

                {/* Options */}
                <div style={{ padding: '0 1.25rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {currentQ.options.map((opt, oi) => {
                        let borderColor = 'var(--border-mid)';
                        let bg = 'var(--bg-elevated)';
                        let color = 'var(--text-secondary)';
                        let prefix = String.fromCharCode(65 + oi) + '. '; // A, B, C, D

                        if (!revealed) {
                            if (chosen === oi) { borderColor = 'var(--accent-primary)'; bg = 'rgba(99,102,241,0.12)'; color = 'var(--text-primary)'; }
                        } else {
                            if (oi === currentQ.correctIndex) { borderColor = '#10b981'; bg = 'rgba(16,185,129,0.1)'; color = '#10b981'; prefix = '✓ '; }
                            else if (oi === chosen && oi !== currentQ.correctIndex) { borderColor = '#f43f5e'; bg = 'rgba(244,63,94,0.08)'; color = '#f43f5e'; prefix = '✗ '; }
                            else { color = 'var(--text-muted)'; }
                        }

                        return (
                            <button
                                key={oi}
                                onClick={() => handleChoose(oi)}
                                disabled={revealed}
                                style={{
                                    display: 'flex', alignItems: 'flex-start', gap: '0.5rem',
                                    padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)',
                                    border: `1px solid ${borderColor}`, background: bg, color,
                                    fontFamily: 'var(--font-sans)', fontSize: '0.875rem',
                                    textAlign: 'left', lineHeight: 1.5, cursor: revealed ? 'default' : 'pointer',
                                    transition: 'all 0.15s ease',
                                    width: '100%',
                                }}
                            >
                                <span style={{ fontWeight: 700, flexShrink: 0, minWidth: '1.5rem', fontFamily: 'var(--font-mono)' }}>{prefix}</span>
                                <span>{opt}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '0.75rem', padding: '0 1.25rem 1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
                    {!revealed ? (
                        <>
                            <button className="btn btn-primary" onClick={handleSubmit} disabled={chosen === null} style={{ minWidth: 120 }}>
                                Submit →
                            </button>
                            {!hintShown && (
                                <button className="btn btn-sm" onClick={handleHint} style={{ color: 'var(--accent-amber)' }}>
                                    💡 Hint
                                </button>
                            )}
                        </>
                    ) : (
                        <button className="btn btn-primary" onClick={handleNext} style={{ minWidth: 160 }}>
                            {qIdx >= questions.length - 1 ? '🏁 See Results' : 'Next Question →'}
                        </button>
                    )}
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                        {qIdx + 1} / {questions.length}
                    </span>
                </div>
            </div>

            {/* Hint Card */}
            {hintShown && !revealed && (
                <div style={{
                    background: 'rgba(245,158,11,0.06)', border: '1px solid rgba(245,158,11,0.2)',
                    borderRadius: 'var(--radius-md)', padding: '0.875rem 1.125rem',
                    fontSize: '0.82rem', color: 'var(--accent-amber)', lineHeight: 1.65,
                    animation: 'fadeIn 0.25s ease',
                }}>
                    <strong>💡 Hint:</strong> Think about what invariant or property is preserved during each step. Consider what makes this algorithm <em>different</em> from the others — does it move data far? Is it stable? What does the inner loop condition do exactly?
                </div>
            )}

            {/* Explanation Card — shown after answer */}
            {revealed && (
                <div style={{
                    background: isCorrect ? 'rgba(16,185,129,0.05)' : 'rgba(244,63,94,0.04)',
                    border: `1px solid ${isCorrect ? 'rgba(16,185,129,0.2)' : 'rgba(244,63,94,0.2)'}`,
                    borderRadius: 'var(--radius-lg)',
                    animation: 'slideIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                    overflow: 'hidden',
                }}>
                    <div style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.875rem 1.25rem',
                        borderBottom: '1px solid var(--border-subtle)',
                        background: isCorrect ? 'rgba(16,185,129,0.08)' : 'rgba(244,63,94,0.06)',
                    }}>
                        <span style={{ fontSize: '1.5rem' }}>{isCorrect ? '✅' : '❌'}</span>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '0.9rem', color: isCorrect ? 'var(--accent-emerald)' : 'var(--accent-rose)' }}>
                                {isCorrect ? 'Correct! Well done.' : `Incorrect — the right answer was: ${String.fromCharCode(65 + currentQ.correctIndex)}.`}
                            </div>
                            {!isCorrect && (
                                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                                    {currentQ.options[currentQ.correctIndex]}
                                </div>
                            )}
                        </div>
                    </div>
                    <div style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--accent-primary)', marginBottom: '0.625rem' }}>
                            📖 Explanation — from Sedgewick & Wayne
                        </div>
                        <pre style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.775rem',
                            color: 'var(--text-secondary)',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.75,
                            margin: 0,
                            wordBreak: 'break-word',
                        }}>
                            {currentQ.explanation}
                        </pre>
                    </div>
                </div>
            )}
        </div>
    );
}
