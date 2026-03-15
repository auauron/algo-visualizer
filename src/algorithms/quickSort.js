// Lomuto partition scheme
export function generateQuickSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [],
        comment: "Starting Quick Sort (Lomuto partition). We pick the last element as pivot and partition around it.",
        codeLine: 0,
        lo: 0,
        hi: n - 1,
        pivot: n - 1,
    });

    const sortedPositions = new Set();

    function quickSort(arr, lo, hi) {
        if (lo >= hi) {
            if (lo === hi) sortedPositions.add(lo);
            return;
        }

        const pivotVal = arr[hi];
        let i = lo - 1;

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...sortedPositions],
            comment: `Partition [${lo}...${hi}]: pivot = ${pivotVal} (index ${hi}). i starts at ${lo - 1}.`,
            codeLine: 2,
            lo,
            hi,
            pivot: hi,
        });

        for (let j = lo; j < hi; j++) {
            steps.push({
                array: [...arr],
                comparing: [j, hi],
                swapping: [],
                sorted: [...sortedPositions],
                comment: `Comparing ${arr[j]} (index ${j}) with pivot ${pivotVal}. ${arr[j] <= pivotVal ? `${arr[j]} ≤ pivot, so increment i and swap.` : `${arr[j]} > pivot, move on.`}`,
                codeLine: 4,
                lo,
                hi,
                pivot: hi,
            });

            if (arr[j] <= pivotVal) {
                i++;
                if (i !== j) {
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                    steps.push({
                        array: [...arr],
                        comparing: [],
                        swapping: [i, j],
                        sorted: [...sortedPositions],
                        comment: `Swapped ${arr[i]} (index ${i}) and ${arr[j]} (now at index ${j}). i is now ${i}.`,
                        codeLine: 5,
                        lo,
                        hi,
                        pivot: hi,
                    });
                }
            }
        }

        // Place pivot
        i++;
        if (i !== hi) {
            [arr[i], arr[hi]] = [arr[hi], arr[i]];
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [i, hi],
                sorted: [...sortedPositions],
                comment: `Placing pivot ${pivotVal} at its final position: index ${i}. All elements left are ≤ pivot, all right are > pivot.`,
                codeLine: 7,
                lo,
                hi,
                pivot: i,
            });
        }

        sortedPositions.add(i);
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...sortedPositions],
            comment: `Pivot ${arr[i]} is now in its final sorted position at index ${i}.`,
            codeLine: 8,
            lo,
            hi,
            pivot: i,
        });

        quickSort(arr, lo, i - 1);
        quickSort(arr, i + 1, hi);
    }

    quickSort(a, 0, n - 1);

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...Array.from({ length: n }, (_, i) => i)],
        comment: "Quick Sort complete! All pivots have been placed in their final positions.",
        codeLine: 9,
        lo: 0,
        hi: n - 1,
        pivot: -1,
    });

    return steps;
}

export const quickSortPseudocode = [
    "procedure quickSort(A, lo, hi):",
    "  if lo >= hi: return",
    "  pivot = A[hi]  // Lomuto: last element",
    "  i = lo - 1",
    "  for j = lo to hi-1:",
    "    if A[j] <= pivot:",
    "      i++; swap(A[i], A[j])",
    "    end if",
    "  end for",
    "  swap(A[i+1], A[hi])  // place pivot",
    "  // pivot is now in final position",
    "  quickSort(A, lo, i)",
    "  quickSort(A, i+2, hi)",
    "end procedure",
];

export const quickSortInfo = {
    name: "Quick Sort",
    timeAvg: "O(n log n)",
    timeBest: "O(n log n)",
    timeWorst: "O(n²)",
    space: "O(log n)",
    stable: false,
    description:
        "Picks a pivot, partitions the array so smaller elements are left and larger are right, then recursively sorts each partition. Very fast in practice.",
    bestCase: "Pivot always lands in the middle: perfectly balanced partitions → O(n log n). Random data usually achieves this.",
    worstCase: "Pivot is always the smallest or largest (sorted/reverse-sorted input): O(n²) — partition sizes are 0 and n-1 each time.",
};
