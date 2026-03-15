export function generateInsertionSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;
    const sorted = new Set([0]);

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [0],
        comment: "Starting Insertion Sort. The first element is trivially sorted.",
        codeLine: 0,
    });

    for (let i = 1; i < n; i++) {
        const key = a[i];
        let j = i - 1;

        steps.push({
            array: [...a],
            comparing: [i],
            swapping: [],
            sorted: [...sorted],
            comment: `Picking up key element: ${key} (index ${i}). Inserting into sorted portion.`,
            codeLine: 2,
        });

        while (j >= 0 && a[j] > key) {
            steps.push({
                array: [...a],
                comparing: [j, j + 1],
                swapping: [],
                sorted: [...sorted],
                comment: `${a[j]} (index ${j}) > ${key} (key). Shifting ${a[j]} one position right.`,
                codeLine: 4,
            });

            a[j + 1] = a[j];
            steps.push({
                array: [...a],
                comparing: [],
                swapping: [j, j + 1],
                sorted: [...sorted],
                comment: `Moved ${a[j + 1]} from index ${j} to index ${j + 1}.`,
                codeLine: 5,
            });

            j--;
        }

        a[j + 1] = key;
        sorted.add(i);
        steps.push({
            array: [...a],
            comparing: [],
            swapping: [],
            sorted: [...sorted],
            comment: `Inserted key ${key} at index ${j + 1}. Sorted portion now extends to index ${i}.`,
            codeLine: 7,
        });
    }

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...Array.from({ length: n }, (_, i) => i)],
        comment: "Insertion Sort complete! All elements are in their final sorted positions.",
        codeLine: 8,
    });

    return steps;
}

export const insertionSortPseudocode = [
    "procedure insertionSort(A):",
    "  // A[0] is trivially sorted",
    "  for i = 1 to n-1:",
    "    key = A[i]",
    "    j = i - 1",
    "    while j >= 0 and A[j] > key:",
    "      A[j+1] = A[j]  // shift right",
    "      j = j - 1",
    "    end while",
    "    A[j+1] = key  // place key",
    "  end for",
    "end procedure",
];

export const insertionSortInfo = {
    name: "Insertion Sort",
    timeAvg: "O(n²)",
    timeBest: "O(n)",
    timeWorst: "O(n²)",
    space: "O(1)",
    stable: true,
    description:
        "Builds the sorted array one element at a time by inserting each new element into its correct position. Excellent for nearly sorted data.",
    bestCase: "Already sorted array: only O(n) comparisons, no shifts needed — very fast!",
    worstCase: "Reverse-sorted array: O(n²) comparisons and shifts for every element.",
};
