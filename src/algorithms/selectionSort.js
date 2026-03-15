/**
 * Selection Sort - generates a step-by-step history
 * Each step: { array, comparing, swapping, sorted, comment, codeLine }
 */
export function generateSelectionSortSteps(arr) {
  const steps = [];
  const a = [...arr];
  const n = a.length;
  const sorted = new Set();

  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [],
    comment: "Starting Selection Sort. We'll find the minimum element and place it at the beginning.",
    codeLine: 0,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      array: [...a],
      comparing: [i],
      swapping: [],
      sorted: [...sorted],
      comment: `Pass ${i + 1}: Assume index ${i} (value: ${a[i]}) is the minimum.`,
      codeLine: 2,
    });

    for (let j = i + 1; j < n; j++) {
      steps.push({
        array: [...a],
        comparing: [minIdx, j],
        swapping: [],
        sorted: [...sorted],
        comment: `Comparing current minimum ${a[minIdx]} (index ${minIdx}) with ${a[j]} (index ${j}).`,
        codeLine: 4,
      });

      if (a[j] < a[minIdx]) {
        minIdx = j;
        steps.push({
          array: [...a],
          comparing: [minIdx],
          swapping: [],
          sorted: [...sorted],
          comment: `Found new minimum: ${a[minIdx]} at index ${minIdx}. Updating minimum index.`,
          codeLine: 5,
        });
      }
    }

    if (minIdx !== i) {
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [i, minIdx],
        sorted: [...sorted],
        comment: `Swapping minimum value ${a[minIdx]} (index ${minIdx}) with ${a[i]} (index ${i}).`,
        codeLine: 8,
      });
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...sorted],
        comment: `Swap complete. ${a[i]} is now at index ${i}.`,
        codeLine: 8,
      });
    } else {
      steps.push({
        array: [...a],
        comparing: [],
        swapping: [],
        sorted: [...sorted],
        comment: `${a[i]} is already in the correct position at index ${i}. No swap needed.`,
        codeLine: 8,
      });
    }

    sorted.add(i);
    steps.push({
      array: [...a],
      comparing: [],
      swapping: [],
      sorted: [...sorted],
      comment: `Index ${i} is now sorted. Value ${a[i]} is in its final position.`,
      codeLine: 9,
    });
  }

  sorted.add(n - 1);
  steps.push({
    array: [...a],
    comparing: [],
    swapping: [],
    sorted: [...sorted],
    comment: "Selection Sort complete! All elements are in their final sorted positions.",
    codeLine: 10,
  });

  return steps;
}

export const selectionSortPseudocode = [
  "procedure selectionSort(A):",
  "  for i = 0 to n-2:",
  "    minIdx = i",
  "    for j = i+1 to n-1:",
  "      if A[j] < A[minIdx]:",
  "        minIdx = j",
  "      end if",
  "    end for",
  "    swap(A[i], A[minIdx])",
  "    // A[i] is now sorted",
  "  end for",
  "end procedure",
];

export const selectionSortInfo = {
  name: "Selection Sort",
  timeAvg: "O(n²)",
  timeBest: "O(n²)",
  timeWorst: "O(n²)",
  space: "O(1)",
  stable: false,
  description:
    "Repeatedly finds the minimum element from the unsorted portion and places it at the beginning. Simple but inefficient for large lists.",
  bestCase: "Even on a sorted array, Selection Sort performs O(n²) comparisons because it always scans the rest of the array.",
  worstCase: "Reverse-sorted array: still O(n²) comparisons and O(n) swaps.",
};
