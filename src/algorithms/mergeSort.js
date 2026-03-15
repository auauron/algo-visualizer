export function generateMergeSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

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
        const left = arr.slice(lo, mid + 1);
        const right = arr.slice(mid + 1, hi + 1);
        let i = 0,
            j = 0,
            k = lo;

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

        while (i < left.length && j < right.length) {
            steps.push({
                array: [...arr],
                comparing: [lo + i, mid + 1 + j],
                swapping: [],
                sorted: [],
                comment: `Comparing ${left[i]} (left[${i}]) vs ${right[j]} (right[${j}]). Picking smaller: ${Math.min(left[i], right[j])}.`,
                codeLine: 6,
                lo,
                mid,
                hi,
            });

            if (left[i] <= right[j]) {
                arr[k] = left[i++];
            } else {
                arr[k] = right[j++];
            }

            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: [],
                comment: `Placed ${arr[k]} at position ${k} in the merged array.`,
                codeLine: 7,
                lo,
                mid,
                hi,
            });
            k++;
        }

        while (i < left.length) {
            arr[k] = left[i++];
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: [],
                comment: `Copying remaining left element ${arr[k]} to position ${k}.`,
                codeLine: 8,
                lo,
                mid,
                hi,
            });
            k++;
        }

        while (j < right.length) {
            arr[k] = right[j++];
            steps.push({
                array: [...arr],
                comparing: [],
                swapping: [k],
                sorted: [],
                comment: `Copying remaining right element ${arr[k]} to position ${k}.`,
                codeLine: 9,
                lo,
                mid,
                hi,
            });
            k++;
        }

        // Mark this range as sorted
        const sortedRange = Array.from({ length: hi - lo + 1 }, (_, idx) => lo + idx);
        steps.push({
            array: [...arr],
            comparing: [],
            swapping: [],
            sorted: sortedRange,
            comment: `Subarray [${lo}...${hi}] is now merged and sorted: [${arr.slice(lo, hi + 1).join(", ")}].`,
            codeLine: 10,
            lo,
            mid,
            hi,
        });
    }

    mergeSort(a, 0, n - 1);

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...Array.from({ length: n }, (_, i) => i)],
        comment: "Merge Sort complete! All subarrays have been merged into one fully sorted array.",
        codeLine: 11,
        lo: 0,
        mid: Math.floor((n - 1) / 2),
        hi: n - 1,
    });

    return steps;
}

export const mergeSortPseudocode = [
    "procedure mergeSort(A, lo, hi):",
    "  if lo >= hi: return",
    "  mid = floor((lo + hi) / 2)",
    "  mergeSort(A, lo, mid)",
    "  mergeSort(A, mid+1, hi)",
    "  merge(A, lo, mid, hi):",
    "    compare left[i] vs right[j]",
    "    place smaller at A[k]",
    "    copy remaining left elements",
    "    copy remaining right elements",
    "    // subarray [lo..hi] is sorted",
    "  end merge",
    "end procedure",
];

export const mergeSortInfo = {
    name: "Merge Sort",
    timeAvg: "O(n log n)",
    timeBest: "O(n log n)",
    timeWorst: "O(n log n)",
    space: "O(n)",
    stable: true,
    description:
        "Divide and conquer: recursively split the array in half, sort each half, then merge them back together. Guaranteed O(n log n) always.",
    bestCase: "Even on a sorted array, Merge Sort always divides and merges — O(n log n) with minimal comparisons.",
    worstCase: "Reverse-sorted: still O(n log n) but with maximum comparisons at each merge step.",
};
