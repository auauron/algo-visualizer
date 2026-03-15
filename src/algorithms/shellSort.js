export function generateShellSortSteps(arr) {
    const steps = [];
    const a = [...arr];
    const n = a.length;

    // Knuth sequence
    let gap = 1;
    while (gap < Math.floor(n / 3)) gap = gap * 3 + 1;

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [],
        comment: `Starting Shell Sort. Initial gap: ${gap} (using Knuth sequence: 1, 4, 13, 40...).`,
        codeLine: 0,
        gap,
    });

    while (gap >= 1) {
        steps.push({
            array: [...a],
            comparing: [],
            swapping: [],
            sorted: [],
            comment: `Gap = ${gap}. Performing insertion sort with this gap between compared elements.`,
            codeLine: 2,
            gap,
        });

        for (let i = gap; i < n; i++) {
            const key = a[i];
            let j = i;

            steps.push({
                array: [...a],
                comparing: [i],
                swapping: [],
                sorted: [],
                comment: `Gap ${gap}: Picking up ${key} at index ${i}. Comparing with element ${gap} positions back.`,
                codeLine: 4,
                gap,
            });

            while (j >= gap && a[j - gap] > key) {
                steps.push({
                    array: [...a],
                    comparing: [j - gap, j],
                    swapping: [],
                    sorted: [],
                    comment: `${a[j - gap]} (index ${j - gap}) > ${key} (key). Shifting ${a[j - gap]} right by gap ${gap}.`,
                    codeLine: 5,
                    gap,
                });

                a[j] = a[j - gap];
                steps.push({
                    array: [...a],
                    comparing: [],
                    swapping: [j - gap, j],
                    sorted: [],
                    comment: `Shifted ${a[j]} from index ${j - gap} to index ${j}.`,
                    codeLine: 6,
                    gap,
                });

                j -= gap;
            }

            a[j] = key;
            steps.push({
                array: [...a],
                comparing: [],
                swapping: [],
                sorted: [],
                comment: `Placed ${key} at index ${j}.`,
                codeLine: 7,
                gap,
            });
        }

        gap = Math.floor(gap / 3);
        if (gap >= 1) {
            steps.push({
                array: [...a],
                comparing: [],
                swapping: [],
                sorted: [],
                comment: `Gap reduced to ${gap}. Array is more ordered; next pass will refine further.`,
                codeLine: 8,
                gap,
            });
        }
    }

    steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...Array.from({ length: n }, (_, i) => i)],
        comment: "Shell Sort complete! Gap reached 1 (standard insertion sort pass done). Array is fully sorted.",
        codeLine: 9,
        gap: 0,
    });

    return steps;
}

export const shellSortPseudocode = [
    "procedure shellSort(A):",
    "  gap = n/2  // or Knuth: 1,4,13,40...",
    "  while gap >= 1:",
    "    // Insertion sort with 'gap' spacing",
    "    for i = gap to n-1:",
    "      key = A[i]; j = i",
    "      while j >= gap and A[j-gap] > key:",
    "        A[j] = A[j-gap]  // shift",
    "        j = j - gap",
    "      end while",
    "      A[j] = key",
    "    end for",
    "    gap = floor(gap / 3)",
    "  end while",
    "end procedure",
];

export const shellSortInfo = {
    name: "Shell Sort",
    timeAvg: "O(n log² n)",
    timeBest: "O(n log n)",
    timeWorst: "O(n²)",
    space: "O(1)",
    stable: false,
    description:
        "An improved Insertion Sort that compares elements far apart first, then progressively reduces the gap. Efficient for medium-sized arrays.",
    bestCase: "Already sorted array: comparisons still happen per gap, but very few shifts — O(n log n).",
    worstCase: "Worst-case depends on gap sequence. With naive n/2 gaps: O(n²). Knuth sequence is much better.",
};
