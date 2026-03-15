import { generateSelectionSortSteps, selectionSortPseudocode, selectionSortInfo } from './selectionSort';
import { generateInsertionSortSteps, insertionSortPseudocode, insertionSortInfo } from './insertionSort';
import { generateShellSortSteps, shellSortPseudocode, shellSortInfo } from './shellSort';
import { generateMergeSortSteps, mergeSortPseudocode, mergeSortInfo } from './mergeSort';
import { generateQuickSortSteps, quickSortPseudocode, quickSortInfo } from './quickSort';

export const ALGORITHMS = {
    selection: {
        id: 'selection',
        label: 'Selection Sort',
        generateSteps: generateSelectionSortSteps,
        pseudocode: selectionSortPseudocode,
        info: selectionSortInfo,
        color: '#6366f1',
        hasLoMidHi: false,
    },
    insertion: {
        id: 'insertion',
        label: 'Insertion Sort',
        generateSteps: generateInsertionSortSteps,
        pseudocode: insertionSortPseudocode,
        info: insertionSortInfo,
        color: '#8b5cf6',
        hasLoMidHi: false,
    },
    shell: {
        id: 'shell',
        label: 'Shell Sort',
        generateSteps: generateShellSortSteps,
        pseudocode: shellSortPseudocode,
        info: shellSortInfo,
        color: '#a855f7',
        hasLoMidHi: false,
    },
    merge: {
        id: 'merge',
        label: 'Merge Sort',
        generateSteps: generateMergeSortSteps,
        pseudocode: mergeSortPseudocode,
        info: mergeSortInfo,
        color: '#3b82f6',
        hasLoMidHi: true,
    },
    quick: {
        id: 'quick',
        label: 'Quick Sort',
        generateSteps: generateQuickSortSteps,
        pseudocode: quickSortPseudocode,
        info: quickSortInfo,
        color: '#06b6d4',
        hasLoMidHi: true,
    },
};

/**
 * Generate sorted intermediate states for the exam trace grid.
 * Returns an array of rows, where each row is the array state at that step.
 * Deduplicates consecutive identical states.
 */
export function generateExamTrace(algoId, inputArr) {
    const algo = ALGORITHMS[algoId];
    if (!algo) return [];

    const steps = algo.generateSteps([...inputArr]);
    const rows = [];
    let lastKey = null;

    for (const step of steps) {
        const key = step.array.join(',');
        if (key !== lastKey) {
            rows.push({
                array: [...step.array],
                lo: step.lo ?? null,
                mid: step.mid ?? null,
                hi: step.hi ?? null,
                gap: step.gap ?? null,
                comment: step.comment,
            });
            lastKey = key;
        }
    }

    return rows;
}

/**
 * Convert a string to a numeric array for sorting (using char codes).
 * Groups duplicates intelligently for display.
 */
export function stringToArray(str) {
    return str.toUpperCase().split('').map(c => c.charCodeAt(0) - 64); // A=1, B=2, ...
}

export function arrayToString(arr) {
    return arr.map(n => String.fromCharCode(n + 64)).join('');
}

/**
 * Generate worst-case input for an algorithm (reverse sorted).
 */
export function generateWorstCase(values) {
    return [...values].sort((a, b) => b - a);
}

/**
 * Generate best-case input for an algorithm.
 */
export function generateBestCase(values) {
    return [...values].sort((a, b) => a - b);
}
