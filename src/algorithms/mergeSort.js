export function generateMergeSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    const aux = new Array(n);

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [],
        comment: "Starting Merge Sort. We recursively divide the array in half, then merge sorted halves.",
        codeLine: 0,
        lo: 0,
        mid: Math.floor((n - 1) / 2),
        hi: n - 1,
    });

    function mergeSort(arr, lo, hi) {
        if (lo >= hi) return;

        const mid = Math.floor((lo + hi) / 2);

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            comment: `Divide: splitting subarray [${lo}...${hi}] at midpoint ${mid} → [${lo}...${mid}] and [${mid + 1}...${hi}].`,
            codeLine: 2,
            lo,
            mid,
            hi,
            activeRange: [lo, hi],
        });

        mergeSort(arr, lo, mid);
        mergeSort(arr, mid + 1, hi);

        // Merge
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            comment: `Merge: combining [${lo}...${mid}] and [${mid + 1}...${hi}].`,
            codeLine: 5,
            lo,
            mid,
            hi,
        });

        for (let k = lo; k <= hi; k++) {
            aux[k] = arr[k];
        }

        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: [],
            comment: `Copied elements to auxiliary array (aux) for range [${lo}...${hi}].`,
            codeLine: 7,
            lo,
            mid,
            hi,
        });

        let i = lo, j = mid + 1;
        for (let k = lo; k <= hi; k++) {
            if (i > mid) {
                const val = aux[j];
                arr[k] = aux[j++];
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [k],
                    sorted: [],
                    comment: `Left half exhausted (i > mid). Copying remaining right element ${val} to arr[${k}].`,
                    codeLine: 10,
                    lo,
                    mid,
                    hi,
                });
            } else if (j > hi) {
                const val = aux[i];
                arr[k] = aux[i++];
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [k],
                    sorted: [],
                    comment: `Right half exhausted (j > hi). Copying remaining left element ${val} to arr[${k}].`,
                    codeLine: 11,
                    lo,
                    mid,
                    hi,
                });
            } else if (aux[j] < aux[i]) {
                const valI = aux[i], valJ = aux[j];
                arr[k] = aux[j++];
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [k],
                    sorted: [],
                    comment: `Comparing left element ${valI} vs right element ${valJ}. ${valJ} is smaller, placing at arr[${k}].`,
                    codeLine: 12,
                    lo,
                    mid,
                    hi,
                });
            } else {
                const valI = aux[i], valJ = aux[j];
                arr[k] = aux[i++];
                steps.push({
                    array: [...arr],
                    comparing: [],
                    swapping: [k],
                    sorted: [],
                    comment: `Comparing left element ${valI} vs right element ${valJ}. ${valI} is smaller or equal, placing at arr[${k}].`,
                    codeLine: 13,
                    lo,
                    mid,
                    hi,
                });
            }
        }

        // Mark this range as sorted
        const sortedRange = Array.from({ length: hi - lo + 1 }, (_, idx) => lo + idx);
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: sortedRange,
            comment: `Subarray [${lo}...${hi}] is now merged and sorted: [${arr.slice(lo, hi + 1).join(", ")}].`,
            codeLine: 14,
            lo,
            mid,
            hi,
            isExamStep: true,
        });
    }

    mergeSort(a, 0, n - 1);

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...Array.from({ length: n }, (_, i) => i)],
        comment: "Merge Sort complete! All subarrays have been merged into one fully sorted array.",
        codeLine: 15,
        lo: 0,
        mid: Math.floor((n - 1) / 2),
        hi: n - 1,
        isExamStep: true,
    });

    return steps;
}

export const mergeSortPseudocode = [
    "procedure mergeSort(A, lo, hi):",           // 0
    "  if lo >= hi: return",                     // 1
    "  mid = floor((lo + hi) / 2)",              // 2
    "  mergeSort(A, lo, mid)",                   // 3
    "  mergeSort(A, mid+1, hi)",                 // 4
    "  merge(A, aux, lo, mid, hi):",             // 5
    "    for k = lo to hi:",                     // 6
    "      aux[k] = A[k]",                       // 7
    "    i = lo; j = mid + 1",                   // 8
    "    for k = lo to hi:",                     // 9
    "      if (i > mid)              A[k] = aux[j++]", // 10
    "      else if (j > hi)          A[k] = aux[i++]", // 11
    "      else if (aux[j] < aux[i]) A[k] = aux[j++]", // 12
    "      else                      A[k] = aux[i++]", // 13
    "    // subarray [lo..hi] is sorted",        // 14
    "end procedure",                             // 15
];

export const mergeSortInfo = {
    name: "Merge Sort",
    timeAvg: "O(n log n)",
    timeBest: "O(n log n)",
    timeWorst: "O(n log n)",
    space: "O(n)",
    stable: true,
    description:
        "John von Neumann's Divide and Conquer algorithm: recursively split array in half, sort each, then merge them. Guaranteed O(n log n).",
    bestCase: "Always divides and merges — O(n log n).",
    worstCase: "Still O(n log n) with maximum comparisons at each merge step.",
};
