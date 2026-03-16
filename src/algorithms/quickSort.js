// Hoare partition scheme
export function generateQuickSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [],
        comment: "Starting Quick Sort (Hoare partition). We pick the first element as pivot.",
        codeLine: 0,
        lo: 0,
        hi: n - 1,
        pivot: 0,
    });

    const sortedPositions = new Set();

    function quickSort(arr, lo, hi) {
        if (lo >= hi) {
            if (lo === hi) sortedPositions.add(lo);
            return;
        }

        const pivotVal = arr[lo];
        let i = lo;
        let j = hi + 1;

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...sortedPositions],
            comment: `Partition [${lo}...${hi}]: pivot = ${pivotVal} (index ${lo}).`,
            codeLine: 2,
            lo,
            hi,
            pivot: lo,
        });

        while (true) {
            // scan left
            while (i < hi) {
                i++;
                steps.push({
                    array: [...arr],
                    comparing: [i, lo],
                    swapping: [],
                    sorted: [...sortedPositions],
                    comment: `Comparing ${arr[i]} (index ${i}) with pivot ${pivotVal}...`,
                    codeLine: 5,
                    lo, hi, pivot: lo
                });
                if (arr[i] >= pivotVal) {
                    steps.push({
                        array: [...arr],
                        comparing: [i, lo],
                        swapping: [],
                        sorted: [...sortedPositions],
                        comment: `${arr[i]} ≥ pivot, pause left pointer at index ${i}.`,
                        codeLine: 5,
                        lo, hi, pivot: lo
                    });
                    break;
                }
            }

            // scan right
            while (j > lo) {
                j--;
                steps.push({
                    array: [...arr],
                    comparing: [j, lo],
                    swapping: [],
                    sorted: [...sortedPositions],
                    comment: `Comparing ${arr[j]} (index ${j}) with pivot ${pivotVal}...`,
                    codeLine: 6,
                    lo, hi, pivot: lo
                });
                if (arr[j] <= pivotVal) {
                    steps.push({
                        array: [...arr],
                        comparing: [j, lo],
                        swapping: [],
                        sorted: [...sortedPositions],
                        comment: `${arr[j]} ≤ pivot, pause right pointer at index ${j}.`,
                        codeLine: 6,
                        lo, hi, pivot: lo
                    });
                    break;
                }
            }

            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [],
                sorted: [...sortedPositions],
                comment: `Checking if pointers crossed: i=${i}, j=${j}.`,
                codeLine: 7,
                lo, hi, pivot: lo
            });

            if (i >= j) {
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [],
                    sorted: [...sortedPositions],
                    comment: `Pointers crossed or met, partitioning complete.`,
                    codeLine: 7,
                    lo, hi, pivot: lo
                });
                break;
            }

            [arr[i], arr[j]] = [arr[j], arr[i]];
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [i, j],
                sorted: [...sortedPositions],
                comment: `Swapped left element ${arr[i]} and right element ${arr[j]}.`,
                codeLine: 8,
                lo, hi, pivot: lo
            });
        }

        [arr[lo], arr[j]] = [arr[j], arr[lo]];
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [lo, j],
            sorted: [...sortedPositions],
            comment: `Placing pivot ${pivotVal} at its final position: index ${j}.`,
            codeLine: 9,
            lo, hi, pivot: j
        });

        sortedPositions.add(j);
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [...sortedPositions],
            comment: `Pivot ${arr[j]} is now in final sorted position.`,
            codeLine: 10,
            lo, hi, pivot: j
        });

        quickSort(arr, lo, j - 1);
        quickSort(arr, j + 1, hi);
    }

    quickSort(a, 0, n - 1);

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...Array.from({ length: n }, (_, i) => i)],
        comment: "Quick Sort complete! All pivots have been placed in their final positions.",
        codeLine: 12,
        lo: 0,
        hi: n - 1,
        pivot: -1,
    });

    return steps;
}

export const quickSortPseudocode = [
    "procedure quickSort(A, lo, hi):",           // 0
    "  if lo >= hi: return",                     // 1
    "  pivot = A[lo]  // Hoare partition",       // 2
    "  i = lo; j = hi + 1",                      // 3
    "  while true:",                             // 4
    "    while i < hi and A[++i] < pivot: pass", // 5
    "    while j > lo and A[--j] > pivot: pass", // 6
    "    if i >= j: break",                      // 7
    "    swap(A[i], A[j])",                      // 8
    "  swap(A[lo], A[j])  // place pivot",       // 9
    "  // pivot is now in final position",       // 10
    "  quickSort(A, lo, j - 1)",                 // 11
    "  quickSort(A, j + 1, hi)",                 // 12
    "end procedure",                             // 13
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
