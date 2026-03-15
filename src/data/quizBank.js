/**
 * Quiz Question Bank — Sedgewick & Wayne Algorithms (Ch 2.1, 2.2, 2.3)
 * Each question has: id, algo, difficulty, category, question, options, correctIndex, explanation, diagram
 */
export const QUIZ_QUESTIONS = [
    // ─── SELECTION SORT ──────────────────────────────────────────────────────────
    {
        id: 1,
        algo: 'selection',
        difficulty: 'easy',
        category: 'Conceptual',
        question: 'What is the core invariant maintained by Selection Sort during each pass i?',
        options: [
            'Elements to the right of i are in ascending order.',
            'Elements to the left of i (including i) are in their final sorted positions.',
            'The minimum element of the whole array is always at index 0.',
            'Elements are sorted in descending order from index N−1 inward.',
        ],
        correctIndex: 1,
        explanation: `Selection Sort maintains this invariant: after pass i, elements at indices 0..i are in their final sorted positions — they will NEVER move again.

Pointer diagram:
  [ ✅ ✅ ✅ | ↑ ? ? ? ? ? ]
              i
  ← sorted → | ← unsorted →

In each pass, it scans the unsorted portion (right of ↑) to find the minimum, then swaps it into position i.`,
        diagram: true,
    },
    {
        id: 2,
        algo: 'selection',
        difficulty: 'easy',
        category: 'Complexity',
        question: 'What is the time complexity of Selection Sort, even if the input array is already sorted?',
        options: [
            'O(N) — it detects the sorted order and stops early.',
            'O(N log N) — it uses divide and conquer.',
            'O(N²) — it always performs the same number of comparisons regardless of input.',
            'O(N²) only in the worst case; O(N) in the best case.',
        ],
        correctIndex: 2,
        explanation: `Selection Sort is famously "input-insensitive." It always performs:
  (N−1) + (N−2) + ... + 1 + 0  ≈  N²/2  comparisons

Even on a sorted array, it still scans the entire unsorted portion each pass to find the minimum — it has no early-exit mechanism.

This is actually different from Insertion Sort, which runs in O(N) on already-sorted data.`,
        diagram: false,
    },
    {
        id: 3,
        algo: 'selection',
        difficulty: 'medium',
        category: 'Stability',
        question: 'Is Selection Sort stable? Consider sorting: B₁ B₂ A by first character.',
        options: [
            'Yes — equal elements are never swapped past each other.',
            'No — a long-distance swap can move an equal element past another.',
            'Yes — because it is an in-place algorithm.',
            'It depends on the input size.',
        ],
        correctIndex: 1,
        explanation: `Selection Sort is NOT stable. Here's why:

  Input:  [ B₁  B₂  A ]
              i=0, min found at index 2 (A)
  Swap a[0] ↔ a[2]:  [ A  B₂  B₁ ]
                                  ↑ B₁ jumped PAST B₂!

The long-distance swap can accidentally reverse the relative order of equal keys. Stability requires that equal items preserve their original left-to-right order.`,
        diagram: true,
    },
    {
        id: 4,
        algo: 'selection',
        difficulty: 'easy',
        category: 'Complexity',
        question: 'How many exchanges (swaps) does Selection Sort make at most?',
        options: [
            'O(N²) exchanges',
            'O(N log N) exchanges',
            'O(N) exchanges — exactly one swap per pass',
            'Zero exchanges if already sorted',
        ],
        correctIndex: 2,
        explanation: `Selection Sort performs at most N exchanges (one per outer loop iteration). This is one of its advantages — minimal data movement.

Even though it does O(N²) comparisons, the number of swaps is linear. This makes it useful when writes/swaps are expensive (e.g., flash memory).`,
        diagram: false,
    },

    // ─── INSERTION SORT ──────────────────────────────────────────────────────────
    {
        id: 5,
        algo: 'insertion',
        difficulty: 'easy',
        category: 'Conceptual',
        question: 'What is the key "basic plan" of Insertion Sort?',
        options: [
            'Find the minimum in the unsorted portion and swap it to the front.',
            'In each iteration i, insert element a[i] into its correct position among the already-sorted elements to its left.',
            'Recursively split the array and merge sorted halves.',
            'Compare elements that are h positions apart, reducing h over time.',
        ],
        correctIndex: 1,
        explanation: `Insertion Sort works like sorting a hand of playing cards:

  [ sorted portion | ↑ | unsorted ]
                    i

  Pick up a[i], then shift larger elements rightward to make room,
  and place a[i] in its correct position.

  Pointer movement:
    j = i, j-1, j-2, ...  ← scanning LEFT while a[j] < a[j-1]
    Swap each time until the right spot is found.`,
        diagram: true,
    },
    {
        id: 6,
        algo: 'insertion',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'What is the best-case time complexity of Insertion Sort, and what input triggers it?',
        options: [
            'O(N log N) — when the array is reverse-sorted.',
            'O(N²) — Insertion Sort is always quadratic.',
            'O(N) — when the input array is already sorted in ascending order.',
            'O(1) — it makes no comparisons at all on a sorted array.',
        ],
        correctIndex: 2,
        explanation: `On an already-sorted array, Insertion Sort makes exactly N−1 comparisons and ZERO exchanges:

  Sorted:  [ 1  2  3  4  5 ]
  For each i, a[i] >= a[i-1], so the inner while-loop exits immediately.

  This gives O(N) best-case — making it excellent for nearly-sorted data.

Contrast: Selection Sort is STILL O(N²) on a sorted array (no early exit).`,
        diagram: false,
    },
    {
        id: 7,
        algo: 'insertion',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'What is an "inversion" in the context of Insertion Sort analysis?',
        options: [
            'A pair of elements that are equal.',
            'A pair of array elements (a[i], a[j]) where i < j but a[i] > a[j] — i.e., out of order.',
            'The number of times the pivot is placed incorrectly.',
            'An element that needs to move more than N/2 positions.',
        ],
        correctIndex: 1,
        explanation: `An inversion is any pair of elements that are out of order:

  Array: [ A  E  E  L  M  O  T  R  X  P  S ]
  Inversions:  T-R, T-P, T-S, R-P, X-P, X-S  → 6 inversions

Key theorem: The number of exchanges Insertion Sort makes EQUALS the number of inversions. This means:
  • Partially-sorted array (few inversions) → O(N) time ✅
  • Reverse-sorted array (N²/2 inversions) → O(N²) time`,
        diagram: true,
    },
    {
        id: 8,
        algo: 'insertion',
        difficulty: 'hard',
        category: 'Stability',
        question: 'Insertion Sort is stable. Looking at the inner loop condition, exactly WHY is it stable?',
        options: [
            'Because it uses a Comparable interface which guarantees stability.',
            'Because equal keys are never swapped — the inner loop uses strict less-than (<), so equal elements stop the loop.',
            'Because it is an in-place sort and all in-place sorts are stable.',
            'Because it processes elements left to right, never moving an element to the right.',
        ],
        correctIndex: 1,
        explanation: `The inner loop condition is the key:

  for (int j = i; j > 0 && less(a[j], a[j-1]); j--)
                            ↑
                   strictly less than!

  less(v, w) returns v.compareTo(w) < 0

If a[j].equals(a[j-1]), compareTo returns 0, so less() returns FALSE → the loop stops. Equal elements NEVER pass each other. This is exactly what stability means!`,
        diagram: false,
    },

    // ─── SHELL SORT ──────────────────────────────────────────────────────────────
    {
        id: 9,
        algo: 'shell',
        difficulty: 'easy',
        category: 'Conceptual',
        question: 'What is the key insight that makes Shell Sort faster than regular Insertion Sort?',
        options: [
            'It uses a binary search to find where to insert each element.',
            'It moves elements MORE than one position at a time using a gap (h), reducing inversions faster.',
            'It splits the array in half before sorting each portion.',
            'It uses a pivot element to partition the array first.',
        ],
        correctIndex: 1,
        explanation: `Regular Insertion Sort only moves elements ONE step at a time. Shell Sort uses a gap h:

  h=4: compare elements 4 apart
  [ L  E  E  A  M  H  L  E  P  S  O  L  T  S  X  R ]
    ↕           ↕           ↕           ↕
  (L,M) (E,H) (E,L) (A,E) ...

  This "h-sorts" the array — creating h interleaved sorted subsequences.
  When h finally = 1, the array is nearly sorted → Insertion Sort flies!

Key: An h-sorted array REMAINS h-sorted after being g-sorted (Sedgewick).`,
        diagram: true,
    },
    {
        id: 10,
        algo: 'shell',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'Sedgewick uses the 3x+1 increment sequence (1, 4, 13, 40, 121, ...) for Shell Sort. Why NOT use powers of 2 (1, 2, 4, 8, ...)?',
        options: [
            'Powers of 2 are harder to compute in code.',
            'With powers of 2, odd-indexed and even-indexed elements never "interact" until the final h=1 pass — delaying meaningful work.',
            'Powers of 2 use too much extra memory.',
            'The 3x+1 sequence is simply faster by pure chance.',
        ],
        correctIndex: 1,
        explanation: `With powers-of-2 gaps:
  h = 8: compare positions (0,8), (1,9), (2,10)...
  h = 4: compare positions (0,4), (1,5), (2,6)...
  h = 2: compare (0,2), (1,3)...

  Notice: index 0 and index 1 NEVER compare until h=1.
  So all the "odd" elements only talk to "odd" elements,
  "even" to "even" — until the final pass.

The 3x+1 sequence interleaves the comparisons better across indices, leading to much more effective early gap passes. Sedgewick found it works well in practice.`,
        diagram: false,
    },
    {
        id: 11,
        algo: 'shell',
        difficulty: 'hard',
        category: 'Stability',
        question: 'Is Shell Sort stable?',
        options: [
            'Yes — because it is based on Insertion Sort, which is stable.',
            'No — the long-distance h-swaps can move equal elements past each other.',
            'Yes — if you use the 3x+1 increment sequence.',
            'It depends on the initial ordering of the input.',
        ],
        correctIndex: 1,
        explanation: `Shell Sort is NOT stable, even though Insertion Sort (which it is based on) IS stable.

Counterexample with h=4:
  Input: [ B₁  B₂  B₃  B₄  A₁ ]
  h=4 pass: compare B₁ (index 0) and A₁ (index 4) → swap!
  Result: [ A₁  B₂  B₃  B₄  B₁ ]
                              ↑ B₁ jumped past ALL the others!

The long-distance h-swaps violate stability. Sedgewick's textbook explicitly calls this out with a proof by counterexample.`,
        diagram: true,
    },

    // ─── MERGE SORT ──────────────────────────────────────────────────────────────
    {
        id: 12,
        algo: 'merge',
        difficulty: 'easy',
        category: 'Conceptual',
        question: 'What are the three steps of the Mergesort Basic Plan?',
        options: [
            'Pick pivot → partition → recurse on both halves.',
            'Divide array into two halves → recursively sort each half → merge the two sorted halves.',
            'Find minimum → swap to front → repeat on remaining array.',
            'h-sort with decreasing gap → finally 1-sort.',
        ],
        correctIndex: 1,
        explanation: `Mergesort Basic Plan (Sedgewick):

  Step 1: DIVIDE
    Split array at midpoint: a[lo..mid] and a[mid+1..hi]

  Step 2: RECURSE
    sort(a, lo, mid)     ← sort left half
    sort(a, mid+1, hi)   ← sort right half

  Step 3: MERGE
    merge(a, lo, mid, hi) ← combine two sorted halves

  Trace on "MERGESORT":
    M E R G E S O R T E X A M P L E
    → sort left half  → E E G M O R R S
    → sort right half → A E E L M P T X
    → merge           → A E E E E G L M M O P R R S T X`,
        diagram: true,
    },
    {
        id: 13,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'Mergesort uses an auxiliary array aux[]. What does this mean for its space complexity, and how does it compare to Selection/Insertion Sort?',
        options: [
            'O(log N) — only the recursive call stack is used.',
            'O(1) — it is in-place like Selection and Insertion sort.',
            'O(N) — the aux[] array needs to be of size N for the last merge.',
            'O(N log N) — it needs a separate aux array at each level of recursion.',
        ],
        correctIndex: 2,
        explanation: `Mergesort space complexity is O(N):

  During the merge step:
    for (int k = lo; k <= hi; k++)
      aux[k] = a[k];   ← copies to aux[]

  The aux[] array is of size N (initialized once).
  Each merge reads from aux[] and writes back to a[].

  Compare to:
  • Selection, Insertion, Shell → O(1) space (in-place)
  • Mergesort                  → O(N) space (NOT in-place)

  Sedgewick: "A sorting algorithm is in-place if it uses ≤ c log N extra memory."
  Mergesort fails this test. In-place merge exists (Kronrod 1969) but is complex.`,
        diagram: false,
    },
    {
        id: 14,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'What recurrence relation describes Mergesort\'s number of comparisons C(N)?',
        options: [
            'C(N) = C(N-1) + N',
            'C(N) = 2·C(N/2) + N',
            'C(N) = C(N/2) + 1',
            'C(N) = N·C(N-1)',
        ],
        correctIndex: 1,
        explanation: `The recurrence is:  C(N) = 2·C(N/2) + N

  Breaking it down:
  • 2·C(N/2) → cost of sorting LEFT half + RIGHT half (two subproblems)
  • + N      → the merge step costs at most N comparisons

  Solving via the "proof by picture":

  Level 0:  N compares         = N
  Level 1:  2·(N/2) compares   = N
  Level 2:  4·(N/4) compares   = N
  ...
  Level k:  2^k·(N/2^k)        = N
  ...
  lg N levels total

  Total = N · lg N  → O(N log N) ✅

  This holds for ALL inputs — best, average, and worst case!`,
        diagram: true,
    },
    {
        id: 15,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Stability',
        question: 'Mergesort is stable. In the merge() method, which specific line of code ensures stability?',
        options: [
            'The line that copies a[] into aux[] before merging.',
            'The condition `else a[k] = aux[i++]` when left and right elements are EQUAL (takes from left first).',
            'The use of the assert statement to verify sorting.',
            'The `if (i > mid) a[k] = aux[j++]` condition.',
        ],
        correctIndex: 1,
        explanation: `The stability-critical line is:

  if      (i > mid)              a[k] = aux[j++]; // left exhausted
  else if (j > hi)               a[k] = aux[i++]; // right exhausted
  else if (less(aux[j], aux[i])) a[k] = aux[j++]; // right < left
  else                           a[k] = aux[i++]; // equal: TAKE FROM LEFT ✅

  "less(aux[j], aux[i])" uses STRICTLY less-than.
  When aux[j] == aux[i] (equal keys), less() returns FALSE,
  so we fall to the else → take from LEFT (i++) → left element placed first.

  This preserves the original relative order of equal elements = STABILITY! 🎯`,
        diagram: false,
    },
    {
        id: 16,
        algo: 'merge',
        difficulty: 'hard',
        category: 'Java-Specific',
        question: 'Sedgewick uses Java `assert` statements in the merge() implementation. What is their purpose, and should they be active in production code?',
        options: [
            'They replace unit tests and should always be enabled in production.',
            'They document and verify internal invariants (preconditions/postconditions) during development; disabled in production for performance.',
            'They are required by the Comparable interface for correctness.',
            'They prevent stack overflow in deep recursion.',
        ],
        correctIndex: 1,
        explanation: `The asserts in merge():

  assert isSorted(a, lo, mid);     // precondition: left half sorted
  assert isSorted(a, mid+1, hi);   // precondition: right half sorted
  ...merge logic...
  assert isSorted(a, lo, hi);      // postcondition: merged result sorted

  Purpose:
  • "Helps detect logic bugs" — catches violations during development
  • "Documents code" — makes the contract explicit

  Production:
  • Enabled:  java -ea MyProgram   (enable assertions)
  • Disabled: java -da MyProgram   (default — NO runtime cost)

  Sedgewick: "Best practice: do NOT use for external argument checking." They are for internal invariants only.`,
        diagram: false,
    },
    {
        id: 17,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'What is the "practical improvement" that cuts Mergesort\'s overhead on small subarrays?',
        options: [
            'Switch to Selection Sort for subarrays of size ≈ 7.',
            'Switch to Insertion Sort for subarrays of size ≈ 7.',
            'Skip the merge step if both halves are already sorted.',
            'Use an iterative bottom-up approach instead of recursion.',
        ],
        correctIndex: 1,
        explanation: `Sedgewick's practical improvement #1:

  if (hi <= lo + CUTOFF - 1) {
    Insertion.sort(a, lo, hi);  // cutoff ≈ 7 items
    return;
  }

  WHY? Mergesort has function call overhead that dominates for tiny arrays. Insertion Sort is very fast for small N due to its simplicity.

  Practical improvement #2 (bonus):
  if (!less(a[mid+1], a[mid])) return;
  // Skip merge if a[mid] ≤ a[mid+1] — already in order!
  // This helps for partially-ordered arrays.`,
        diagram: false,
    },

    // ─── QUICK SORT ──────────────────────────────────────────────────────────────
    {
        id: 18,
        algo: 'quick',
        difficulty: 'easy',
        category: 'Conceptual',
        question: 'What is the Quicksort Basic Plan?',
        options: [
            'Find minimum → place at front → recurse on right portion.',
            'Shuffle → partition around a pivot → recursively sort each partition.',
            'Split in half → sort each half → merge back together.',
            'h-sort with decreasing increments until h=1.',
        ],
        correctIndex: 1,
        explanation: `Quicksort Basic Plan (Hoare, 1961):

  1. SHUFFLE: Randomize array (prevents worst case — more on this!)
  2. PARTITION: Place pivot a[j] in its FINAL position so:
       • all elements LEFT of j  are ≤ a[j]
       • all elements RIGHT of j are ≥ a[j]
  3. RECURSE:
       sort(a, lo, j-1)   ← left partition
       sort(a, j+1, hi)   ← right partition

  After partitioning:
  [ ≤ v | v | ≥ v ]
    lo    j   hi
          ↑
      v is in its FINAL position forever!`,
        diagram: true,
    },
    {
        id: 19,
        algo: 'quick',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'What input triggers Quicksort\'s worst-case O(N²) performance?',
        options: [
            'A randomly shuffled array.',
            'An array with all equal elements.',
            'An already sorted (or reverse-sorted) array when the pivot is always the first or last element.',
            'An array of size exactly N = 1000.',
        ],
        correctIndex: 2,
        explanation: `Worst case: the pivot is ALWAYS the smallest or largest element.

  Example with sorted array [1,2,3,4,5] and pivot = last element:
  Partition of [1,2,3,4,5]: pivot=5, all go left → j=4
  Partition of [1,2,3,4]:   pivot=4, all go left → j=3
  ...
  Partition sizes: N-1, N-2, ..., 1 → like Selection Sort!

  Cost: N + (N-1) + (N-2) + ... + 1 ≈ N²/2  comparisons

  THIS is why Sedgewick shuffles first:
    StdRandom.shuffle(a);  // before sorting!
  The shuffle makes it astronomically unlikely to hit the worst case.
  
  "More likely your computer is struck by lightning." — Sedgewick`,
        diagram: true,
    },
    {
        id: 20,
        algo: 'quick',
        difficulty: 'hard',
        category: 'Conceptual',
        question: 'In Quicksort\'s Lomuto/Hoare partition, Sedgewick says "equal keys should stop the scan." What happens if you DON\'T stop on equal keys?',
        options: [
            'The sort becomes unstable.',
            'The algorithm goes quadratic on arrays with many duplicate keys (all equal keys case).',
            'The pivot is never placed in its correct position.',
            'The recursive calls become unbalanced only for small arrays.',
        ],
        correctIndex: 1,
        explanation: `This is a critical bug found in real C library implementations (1990s)!

  Input: all equal keys  [ A A A A A A A A ]
  
  If we DON'T stop on equal keys:
    i scans right past all A's → i = hi (always at rightmost)
    j stays at lo                → j = lo
    Partition is completely unbalanced: sizes 0 and N-1!

  Cost per level: N + (N-1) + ... ≈ N²/2  — QUADRATIC! 💥

  If we DO stop on equal keys:
    i and j meet approximately in the middle
    Partition sizes ≈ N/2 each → balanced!
    Cost: O(N log N) ✅

  Even Microsoft's browser ballot and several textbooks had this defect!`,
        diagram: true,
    },
    {
        id: 21,
        algo: 'quick',
        difficulty: 'hard',
        category: 'Java-Specific',
        question: 'Java\'s Arrays.sort() uses Mergesort for Objects but Quicksort for primitive types (int, double, etc.). Why the difference?',
        options: [
            'Quicksort is faster for all types; this is a historical bug in Java.',
            'Mergesort is required for Object arrays because Objects implement Comparable, but primitives do not.',
            'Stability matters for Objects (they may carry extra data sorted by multiple keys), while primitives have no "extra data" to preserve order for.',
            'Quicksort runs out of memory with Object arrays due to boxing overhead.',
        ],
        correctIndex: 2,
        explanation: `The key reason is STABILITY:

  Objects (String, Date, etc.):
    • May have satellite data beyond the sort key
    • Example: sort students by name, then by section
      → must preserve name-order within same section
    • Mergesort is STABLE → correct behavior guaranteed ✅

  Primitives (int, double, etc.):
    • An int is just a value — there's no "extra data"
    • Two ints with value 5 are completely interchangeable
    • Stability is meaningless for pure primitives
    • Quicksort is faster in practice (cache-friendly, no aux array)
    → Use faster Quicksort safely ✅

  Sedgewick: "Java sort for objects = tuned mergesort. Java sort for primitive types = tuned quicksort."`,
        diagram: false,
    },
    {
        id: 22,
        algo: 'quick',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'What is the average-case number of comparisons for Quicksort, and how does it compare to Mergesort?',
        options: [
            'Quicksort: ~N² / 4; Mergesort: ~N log N — Mergesort is always better.',
            'Quicksort: ~1.39 N log N; Mergesort: ~N log N — Quicksort uses 39% MORE comparisons but is faster in practice.',
            'Both use exactly N log N comparisons on average.',
            'Quicksort: ~N log N / 2 — Quicksort uses fewer comparisons than Mergesort.',
        ],
        correctIndex: 1,
        explanation: `From Sedgewick's analysis:
  • Mergesort:  ≤  N lg N comparisons      (optimal! proven lower bound)
  • Quicksort: ≈  1.39 N ln N ≈ 2 N ln N  (39% more than mergesort)

  But Quicksort is FASTER in practice! Why?
  • Less data movement (in-place, excellent cache behavior)
  • No aux[] array allocation
  • Inner loop is extremely tight:
      while (less(a[++i], a[lo])) ...  ← very fast

  Sedgewick: "Quicksort is faster despite more compares because of less data movement."

  Average-case formula: C_N ≈ 2(N+1) ln N ≈ 1.39 N lg N`,
        diagram: false,
    },
    {
        id: 23,
        algo: 'quick',
        difficulty: 'hard',
        category: 'Conceptual',
        question: 'What problem does Dijkstra\'s 3-way partitioning solve, and what are the three regions it creates?',
        options: [
            'It solves the equal-keys problem by creating regions: [< pivot | = pivot | > pivot].',
            'It solves the worst-case problem by always picking the median as pivot.',
            'It creates regions [sorted | pivot | unsorted] to avoid recursion on the pivot.',
            'It splits the array into 3 equal thirds for better parallelism.',
        ],
        correctIndex: 0,
        explanation: `Dijkstra's Dutch National Flag algorithm creates 3 regions:

  Before:  [ v | ??? ]
            lo      hi

  During:  [ < v | = v | ??? | > v ]
              lo   lt  i  gt  hi

  After:   [ < v | = = = = v | > v ]
              lo   lt      gt  hi

  All elements EQUAL to pivot are placed in their final positions simultaneously! Then we only recurse on the < and > regions (skip the = region).

  This transforms arrays with many duplicates from O(N²) → O(N):
  • All equal keys: just one pass, no recursion needed → O(N)!
  • k distinct keys: O(N log k) time (linear when k is constant)`,
        diagram: true,
    },
    {
        id: 24,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'How does Bottom-Up Mergesort differ from Top-Down (recursive) Mergesort?',
        options: [
            'Bottom-Up sorts from right to left instead of left to right.',
            'Bottom-Up uses iteration instead of recursion: it starts by merging pairs of size 1, then 2, 4, 8, etc.',
            'Bottom-Up is faster because it avoids the merge step.',
            'Bottom-Up requires O(N log N) extra space instead of O(N).',
        ],
        correctIndex: 1,
        explanation: `Bottom-Up Mergesort — no recursion needed!

  sz=1:  merge pairs of 1:   [M|E] [R|G] [E|S] [O|R] ...
  sz=2:  merge pairs of 2:   [E M|G R] [E S|O R] ...
  sz=4:  merge pairs of 4:   [E G M R|E O R S] ...
  sz=8:  merge pairs of 8:   [E E G M O R R S|A E E L M P T X]
  sz=16: final merge          [A E E E E G L M M O P R R S T X] ✅

  Code essence:
  for (int sz = 1; sz < N; sz = sz+sz)
    for (int lo = 0; lo < N-sz; lo += sz+sz)
      merge(a, lo, lo+sz-1, min(lo+sz+sz-1, N-1));

  Same O(N log N) performance, but ~10% slower than top-down in practice due to less optimal cache behavior.`,
        diagram: true,
    },
    {
        id: 25,
        algo: 'selection',
        difficulty: 'hard',
        category: 'Complexity',
        question: 'Sedgewick\'s complexity chapter proves a LOWER BOUND for comparison-based sorting. What is it, and what model of computation is used?',
        options: [
            'O(N) lower bound using the RAM model — any algorithm must read every element.',
            'Ω(N log N) lower bound using the decision tree model — any comparison-based sort must make at least lg(N!) comparisons.',
            'O(N²) lower bound — because comparisons are the only allowed operation.',
            'Ω(N log N) lower bound using the Turing machine model.',
        ],
        correctIndex: 1,
        explanation: `Sedgewick's sorting complexity lower bound proof:

  Model: DECISION TREE (nodes = comparisons, leaves = orderings)
  
  For N items:
  • There are N! possible orderings → at least N! leaves
  • A binary tree of height h has at most 2^h leaves

  Therefore:   2^h ≥ N!
               h  ≥ lg(N!)  ≈  N lg N  (Stirling's formula)

  MEANING: ANY comparison-based sorting algorithm must make
           at least ~N lg N comparisons in the worst case.

  Conclusion:
  • Mergesort uses ≤ N lg N comparisons → OPTIMAL for comparisons!
  • But NOT optimal for space (uses O(N) aux array).
  
  The lower bound does NOT apply if you exploit:
  • Initial order (Insertion Sort on nearly-sorted data)
  • Key distribution (Radix Sort)
  • Duplicate structure (3-way Quicksort)`,
        diagram: true,
    },

    // ─── BATCH 2: QUESTIONS 26–50 ─────────────────────────────────────────────

    // ── IN-PLACE FOCUS ────────────────────────────────────────────────────────
    {
        id: 26,
        algo: 'selection',
        difficulty: 'medium',
        category: 'In-Place',
        question: 'Sedgewick defines an "in-place" sorting algorithm precisely. What is that formal definition?',
        options: [
            'An algorithm that uses no extra memory at all — O(0) space.',
            'An algorithm that uses at most c·log N extra memory for some constant c.',
            'An algorithm that sorts within a fixed-size array without any function calls.',
            'An algorithm that makes no more than N swaps.',
        ],
        correctIndex: 1,
        explanation: `Sedgewick's exact definition from the textbook:

  "A sorting algorithm is in-place if it uses ≤ c log N extra memory."

  This is a precise, mathematical definition — not just "no extra array."
  The log N bound accounts for the recursive call stack.

  Which algorithms are in-place?
  • Selection Sort: O(1) space                → ✅ in-place
  • Insertion Sort: O(1) space                → ✅ in-place
  • Shell Sort:     O(1) space                → ✅ in-place
  • Merge Sort:     O(N) aux array            → ❌ NOT in-place
  • Quicksort:      O(log N) call stack only  → ✅ in-place
  • 3-way Quicksort: O(log N) call stack      → ✅ in-place

  Challenge: Can we build an in-place merge? Kronrod (1969) showed it's
  possible, but the resulting algorithm is extremely complex.`,
        diagram: false,
    },
    {
        id: 27,
        algo: 'merge',
        difficulty: 'hard',
        category: 'In-Place',
        question: 'Why is Mergesort NOT considered an in-place algorithm, even though the sorted result ends up back in the original array a[]?',
        options: [
            'Because it uses recursion, which requires extra stack space.',
            'Because it requires an auxiliary array aux[] of size N — this exceeds the O(log N) memory limit for in-place algorithms.',
            'Because the merge step copies data more than once.',
            'Because Sedgewick only considers iterative algorithms as in-place.',
        ],
        correctIndex: 1,
        explanation: `Mergesort's memory problem:

  The merge() method requires:
    for (int k = lo; k <= hi; k++)
      aux[k] = a[k];   ← copies lo..hi into aux[]

  The aux[] array has SIZE N. Even though the final result
  is written back to a[], the aux[] array itself uses O(N)
  extra memory throughout the entire sort.

  O(N) > O(log N)  →  NOT in-place! ❌

  Compare to Quicksort:
  • No aux[] array
  • Only uses O(log N) stack frames for recursion
  → Quicksort IS in-place ✅

  Sedgewick notes: "In-place merge is possible (Kronrod 1969)
  but not worth the cost in practice."`,
        diagram: false,
    },
    {
        id: 28,
        algo: 'quick',
        difficulty: 'medium',
        category: 'In-Place',
        question: 'Quicksort is in-place. But Sedgewick warns about a subtle threat to this property. What is it?',
        options: [
            'Quicksort secretly allocates an auxiliary array for the partitioning step.',
            'In the worst case, the recursive call stack grows to O(N) depth, technically violating the in-place O(log N) memory guarantee.',
            'The pivot swap at the end of partitioning requires O(N) temporary storage.',
            'Quicksort is only in-place when using the median-of-3 pivot strategy.',
        ],
        correctIndex: 1,
        explanation: `Quicksort's in-place guarantee has a CAVEAT:

  Best/Average case recursion tree depth: O(log N)
    → stack uses O(log N) frames ✅

  WORST case (sorted array, bad pivot):
    partition(0..N-1) → partition(0..N-2) → ... → partition(0..1)
    → stack depth = N frames → O(N) memory! ❌

  FIX: Always recurse on the SMALLER subarray first:
    if (j - lo < hi - j) {
      sort(a, lo, j-1);   ← sort smaller side first
      sort(a, j+1, hi);
    } else {
      sort(a, j+1, hi);   ← sort smaller side first
      sort(a, lo, j-1);
    }
  This guarantees O(log N) stack depth even in the worst case.

  Sedgewick: "Can guarantee logarithmic depth by recurring
  on smaller subarray before larger subarray."`,
        diagram: true,
    },

    // ── STABILITY FOCUS ───────────────────────────────────────────────────────
    {
        id: 29,
        algo: 'selection',
        difficulty: 'easy',
        category: 'Stability',
        question: 'What does it mean for a sorting algorithm to be "stable"?',
        options: [
            'The algorithm always runs in exactly O(N log N) time regardless of input.',
            'A stable sort preserves the relative order of elements with equal keys.',
            'The algorithm never crashes or throws exceptions on any input.',
            'The algorithm produces the same output every time it is run on the same input.',
        ],
        correctIndex: 1,
        explanation: `Sedgewick's definition of stability:

  "A stable sort preserves the relative order of items with equal keys."

  Why does this matter? Consider students with both a name and section:
  Step 1: Sort by NAME   → Andrews, Battle, Chen, Fox, Furia, ...
  Step 2: Sort by SECTION (stable) →
    Furia (sec 1), Rohde (sec 2), Andrews (sec 3), Chen (sec 3), Fox (sec 3)...
                                   ← within section 3, NAME order preserved!

  With an UNSTABLE sort in Step 2:
    Fox (sec 3), Chen (sec 3), Andrews (sec 3)...
    ← section-3 students in random order — name order LOST! ❌

  Stable algorithms:   Insertion Sort ✅   Mergesort ✅
  Unstable algorithms: Selection Sort ❌   Shell Sort ❌   Quicksort ❌`,
        diagram: true,
    },
    {
        id: 30,
        algo: 'quick',
        difficulty: 'medium',
        category: 'Stability',
        question: 'Is Quicksort (Hoare partition) stable?',
        options: [
            'Yes — the pivot is always placed in its final position, preserving relative order.',
            'No — long-distance swaps during partitioning can move equal elements past each other.',
            'Yes — if the input is already partially sorted.',
            'It depends on whether you use Lomuto or Hoare partition.',
        ],
        correctIndex: 1,
        explanation: `Quicksort is NOT stable. From Sedgewick's proof by counterexample:

  Input: [ B₁  C₁  C₂  A₁ ]   (subscript = original position)

  partition with pivot B₁ (lo=0):
    i scans right: stops at C₁ (index 1)   ← C > B
    j scans left:  stops at A₁ (index 3)   ← A < B
    Swap a[1] ↔ a[3]:  [ B₁  A₁  C₂  C₁ ]
    i and j cross, swap B₁ with A₁:  [ A₁  B₁  C₂  C₁ ]

  Result: C₂ and C₁ are now in original order, but in general,
  the long-distance swaps will violate stability.

  Sedgewick's table explicitly marks Quicksort as "not stable."
  This is why Java uses Mergesort (stable) for Object arrays.`,
        diagram: true,
    },
    {
        id: 31,
        algo: 'merge',
        difficulty: 'easy',
        category: 'Stability',
        question: 'Which sorting algorithms from the Sedgewick textbook summary table are marked as STABLE?',
        options: [
            'Selection Sort and Shell Sort.',
            'Insertion Sort and Mergesort.',
            'Quicksort and Mergesort.',
            'Shell Sort and Quicksort.',
        ],
        correctIndex: 1,
        explanation: `From Sedgewick's "Sorting Summary" table (Ch 2.3):

  Algorithm     | Stable?
  --------------|--------
  Selection Sort| ❌  No  (long-distance swaps)
  Insertion Sort| ✅  Yes (equal keys never swap past each other)
  Shell Sort    | ❌  No  (long-distance h-swaps)
  Merge Sort    | ✅  Yes (takes from left subarray on equal keys)
  Quicksort     | ❌  No  (long-distance partition swaps)
  3-way Quick   | ❌  No  (same reason)

  "Holy grail": an algorithm that is in-place AND stable with
  O(N log N) worst-case is marked ??? in Sedgewick's table —
  no such algorithm is well-known in practice!`,
        diagram: false,
    },
    {
        id: 32,
        algo: 'insertion',
        difficulty: 'medium',
        category: 'Stability',
        question: 'You first sort students by NAME (stable sort) then by SECTION (stable sort). What is the relative order of students in the same section?',
        options: [
            'Random — the second sort destroys the first sort\'s order.',
            'Still sorted by NAME — the stable second sort preserves the name-order within each equal section key.',
            'Sorted by SECTION only — the first sort is completely overridden.',
            'Sorted by the last character of their name.',
        ],
        correctIndex: 1,
        explanation: `This is the KEY practical application of stability from Sedgewick:

  After Step 1 (sort by NAME):
    Andrews, Battle, Chen, Fox, Furia, Gazsi, Kanaga, Rohde

  After Step 2 (stable sort by SECTION):
    Furia-1, Rohde-2, Andrews-3, Chen-3, Fox-3, Kanaga-3, Battle-4, Gazsi-4
                       ↑ Within section 3: Andrews < Chen < Fox < Kanaga
                         (alphabetical name order PRESERVED!) ✅

  This works BECAUSE the sort in Step 2 is stable.
  The second sort only moves elements when sections differ —
  equal-section elements keep their relative (name-sorted) order.

  Sedgewick: "A typical application. First, sort by name;
  then sort by section."`,
        diagram: true,
    },

    // ── SELECTION SORT — deeper ───────────────────────────────────────────────
    {
        id: 33,
        algo: 'selection',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'During Selection Sort, the inner loop found a new minimum at index 4. What does the algorithm do next?',
        options: [
            'Immediately outputs the minimum and continues to the next pass.',
            'Swaps a[i] (current outer loop position) with a[4], placing the minimum in position i.',
            'Recursively sorts the subarray from index 4 to N.',
            'Inserts a[4] into its correct position by shifting elements right.',
        ],
        correctIndex: 1,
        explanation: `Selection Sort inner loop trace:

  Pass i=0:
    min = 0  (start with a[0] as min)
    j=1: a[1] < a[min]? → update min=1
    j=2: a[2] < a[min]? → no
    j=3: a[3] < a[min]? → no
    j=4: a[4] < a[min]? → YES → min=4
    ...
    After inner loop: min=4 (the actual minimum)

  Action: exch(a, i, min)
    → SWAP a[0] ↔ a[4]
    → The global minimum is now at index 0 (final position ✅)

  This is Sedgewick's key commentary:
  "In Selection Sort, we found a new minimum at index 4,
  so we swap it with index 0."`,
        diagram: true,
    },
    {
        id: 34,
        algo: 'selection',
        difficulty: 'hard',
        category: 'Complexity',
        question: 'Selection Sort\'s running time is "insensitive to input." What specific real-world use case does this property make it USEFUL for?',
        options: [
            'Sorting large datasets where N > 10,000.',
            'Situations where the cost of writing/swapping data is very high (e.g., flash memory), since it makes exactly N exchanges.',
            'Online sorting where elements arrive one at a time.',
            'Sorting data that is already nearly sorted.',
        ],
        correctIndex: 1,
        explanation: `Selection Sort's unusual strengths:

  • EXACTLY N exchanges (one per outer loop pass)
  • This is LINEAR data movement — the minimum possible!

  Compare:
  • Insertion Sort: up to N²/2 exchanges (lots of shifting)
  • Selection Sort: exactly N exchanges (minimal writes)

  Practical relevance:
  Flash memory (SSD, USB drives) has a limited write-cycle budget.
  Each cell can only be written ~10,000-100,000 times.

  → When WRITES are expensive but READS are cheap,
    Selection Sort's linear exchange count is valuable.

  Sedgewick footnote: "Data movement is minimal. Linear number
  of exchanges." — this is its defining characteristic.`,
        diagram: false,
    },

    // ── INSERTION SORT — deeper ───────────────────────────────────────────────
    {
        id: 35,
        algo: 'insertion',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'For a partially sorted array with exactly C inversions, how many exchanges does Insertion Sort make?',
        options: [
            'Always N²/4 exchanges regardless of inversions.',
            'Exactly C exchanges — one exchange per inversion.',
            'At most N exchanges — proportional to the array size.',
            'At most 2C exchanges — two swaps are needed per inversion.',
        ],
        correctIndex: 1,
        explanation: `Key theorem from Sedgewick:

  "The number of exchanges equals the number of inversions."

  Each exchange in Insertion Sort fixes EXACTLY ONE inversion:
    before: [ ... X  Y ... ] where X > Y (one inversion)
    exch(): [ ... Y  X ... ] (inversion eliminated)

  So:  exchanges = inversions = C

  And comparisons = exchanges + (N-1) = C + N - 1

  Example:
    Array: [ A  E  E  L  M  O  T  R  X  P  S ]
    6 inversions (T-R, T-P, T-S, R-P, X-P, X-S)
    → Insertion Sort makes exactly 6 exchanges ✅

  This is why Insertion Sort is O(N) on nearly-sorted data:
  "Partially sorted" ≡ C ≤ cN → O(N) time.`,
        diagram: true,
    },
    {
        id: 36,
        algo: 'insertion',
        difficulty: 'hard',
        category: 'Conceptual',
        question: 'Sedgewick says Insertion Sort is excellent for "partially sorted" arrays. What formal definition does he give for "partially sorted"?',
        options: [
            'An array where at least half the elements are already in their final positions.',
            'An array of size N with at most N elements out of place.',
            'An array where the number of inversions is ≤ cN for some constant c.',
            'An array that is sorted except for the first and last elements.',
        ],
        correctIndex: 2,
        explanation: `Sedgewick's formal definition of "partially sorted":

  "An array is partially sorted if the number of inversions is ≤ cN"
  where c is some constant.

  Two concrete examples given:
  1. A subarray of size 10 appended to a sorted subarray of size N
     → at most 10·N inversions related to the appended elements
     → still O(N) if we consider only O(1) extra elements

  2. An array of size N with only 10 entries out of place
     → at most 10·N inversions → Insertion Sort runs in O(N) ✅

  This is why Insertion Sort is used as a subroutine in:
  • Mergesort's "cutoff" optimization (sort small subarrays)
  • Shell Sort's final pass (array nearly sorted after h-sorting)
  • Library sorts (Java's Arrays.sort uses it for small arrays)`,
        diagram: false,
    },

    // ── SHELL SORT — deeper ───────────────────────────────────────────────────
    {
        id: 37,
        algo: 'shell',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'What is the key property that allows Shell Sort to work correctly — i.e., why doesn\'t the h-sorting of pass 2 "undo" the work of pass 1?',
        options: [
            'Each pass uses a smaller gap, so later passes do less work.',
            'A g-sorted array REMAINS g-sorted after being h-sorted — the property is preserved across passes.',
            'Shell Sort works in-place, so no data is overwritten.',
            'The Knuth 3x+1 sequence guarantees no conflicts between passes.',
        ],
        correctIndex: 1,
        explanation: `This is the critical mathematical property of Shell Sort:

  Proposition (Sedgewick): "A g-sorted array remains g-sorted after h-sorting it."

  Meaning:
    Pass 1: 13-sort the array → array is 13-sorted
    Pass 2: 4-sort the array  → array is 4-sorted AND STILL 13-sorted!
    Pass 3: 1-sort the array  → array is 1-sorted (fully sorted) ✅

  No work is "undone" because the h-sort for a different h
  preserves the g-sorted structure.

  This is why the decreasing gap sequence works at all!
  Without this property, Shell Sort would be hopelessly broken.

  Sedgewick notes: "Challenge: Prove this fact — it's more subtle
  than you'd think!" The proof involves showing every pair of
  elements that were g-sorted remains in relative order.`,
        diagram: true,
    },
    {
        id: 38,
        algo: 'shell',
        difficulty: 'hard',
        category: 'Complexity',
        question: 'What is the proven worst-case time complexity of Shell Sort using the 3x+1 increment sequence (1, 4, 13, 40, ...)?',
        options: [
            'O(N log N) — same as Mergesort.',
            'O(N²) — same as Insertion Sort.',
            'O(N^(3/2)) — proven upper bound for the 3x+1 sequence.',
            'Unknown — the exact complexity of Shell Sort is still an open problem.',
        ],
        correctIndex: 2,
        explanation: `Shell Sort complexity is surprisingly nuanced:

  PROVEN: Worst-case with 3x+1 is O(N^(3/2))
    Sedgewick: "The worst-case number of compares used by shellsort
    with the 3x+1 increments is O(N^(3/2))."

  OBSERVED in practice:
    N        | Actual compares | N^1.289 | 2.5·N·lgN
    5,000    | 93,000          | 58,000  | 106,000
    10,000   | 209,000         | 143,000 | 230,000

  The empirical measure is closer to O(N^1.289) — faster than O(N^(3/2))!

  OPEN PROBLEM:
  "Accurate model has not yet been discovered (!) — Sedgewick"

  This means Shell Sort's exact average-case complexity is UNKNOWN.
  It's one of the few algorithms in widespread use whose complexity
  is not fully understood mathematically.`,
        diagram: false,
    },

    // ── MERGE SORT — deeper ───────────────────────────────────────────────────
    {
        id: 39,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'What is the purpose of the "eliminate the copy to auxiliary array" optimization in Mergesort?',
        options: [
            'It reduces space complexity from O(N) to O(log N).',
            'It saves time by alternating which array acts as "source" and which as "destination" in each recursive call, avoiding the copy step.',
            'It avoids allocating the aux[] array altogether.',
            'It reduces the number of comparisons by half.',
        ],
        correctIndex: 1,
        explanation: `Sedgewick's 3rd practical improvement:

  PROBLEM: The standard merge() copies a[] to aux[] before merging:
    for (int k = lo; k <= hi; k++) aux[k] = a[k]; ← TIME COST

  SOLUTION: At each recursive level, swap the roles of a[] and aux[]:

  // merge FROM a[] TO aux[]  (no copy needed)
  private static void merge(Comparable[] a, Comparable[] aux, ...)
  {
    int i = lo, j = mid+1;
    for (int k = lo; k <= hi; k++)
      if      (i > mid)           aux[k] = a[j++];
      else if (j > hi)            aux[k] = a[i++];
      else if (less(a[j], a[i]))  aux[k] = a[j++];
      else                        aux[k] = a[i++];
  }

  // swap roles: sort aux[], writing results into a[]
  sort(aux, a, lo, mid);    // ← note: arguments reversed!
  sort(aux, a, mid+1, hi);
  merge(a, aux, lo, mid, hi);

  RESULT: Eliminates the copy loop → faster in practice.
  Note: sort(a) initializes aux[] = a[] before recursion starts.`,
        diagram: false,
    },
    {
        id: 40,
        algo: 'merge',
        difficulty: 'hard',
        category: 'Conceptual',
        question: 'What is the midpoint formula used in Mergesort\'s sort() to avoid integer overflow?',
        options: [
            'mid = (lo + hi) / 2',
            'mid = lo + (hi - lo) / 2',
            'mid = hi / 2',
            'mid = (lo + hi) >> 1',
        ],
        correctIndex: 1,
        explanation: `The safe midpoint formula from Sedgewick:

  int mid = lo + (hi - lo) / 2;

  WHY NOT  (lo + hi) / 2 ?
  If lo = 1,000,000,000 and hi = 1,500,000,000:
    lo + hi = 2,500,000,000  →  OVERFLOWS int (max ~2.1 billion)!
    → produces a NEGATIVE number → undefined behavior

  The safe version:
    hi - lo = 500,000,000      (no overflow)
    (hi - lo) / 2 = 250,000,000
    lo + 250,000,000 = 1,250,000,000 ✅ (correct midpoint)

  This is a classic Java/C++ bug. Sedgewick's code explicitly
  uses lo + (hi - lo) / 2 throughout his sort implementations.

  Also seen in Quicksort:
    int m = medianOf3(a, lo, lo + (hi - lo)/2, hi);`,
        diagram: false,
    },

    // ── QUICK SORT — deeper ───────────────────────────────────────────────────
    {
        id: 41,
        algo: 'quick',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'In Quicksort\'s partition(), after the i and j pointers cross, what is the final step and why?',
        options: [
            'Swap a[i] with a[lo] — to put the pivot in its final position at i.',
            'Swap a[lo] with a[j] — to put the pivot in its final position at j, since j is the last element ≤ pivot.',
            'Swap a[mid] with a[lo] — to center the pivot.',
            'Do nothing — the pointers crossing means the array is already partitioned.',
        ],
        correctIndex: 1,
        explanation: `Quicksort partition() final step:

  State when i >= j (pointers crossed):
    [ lo | < v ........... | ≥ v ... | lo ]
           lo              j  i      hi
    Everything left of j is ≤ pivot (a[lo])
    Everything right of j is ≥ pivot

  Final swap: exch(a, lo, j)
    → Puts the pivot (originally at lo) into position j
    → position j is now the FINAL sorted position of the pivot

  After swap:
    [ < v | v | ≥ v ]
      lo    j   hi
            ↑
        permanently in sorted position — never touched again!

  return j;  ← caller uses this to define the two sub-problems

  This is the Hoare partition scheme (conceptually).`,
        diagram: true,
    },
    {
        id: 42,
        algo: 'quick',
        difficulty: 'hard',
        category: 'Conceptual',
        question: 'Why does Quicksort need to shuffle the array BEFORE sorting? What specifically does the shuffle prevent?',
        options: [
            'The shuffle ensures the array is partially sorted, which speeds up the algorithm.',
            'The shuffle provides a PROBABILISTIC guarantee against worst-case O(N²) performance — it makes it astronomically unlikely that the pivot is always the min or max.',
            'The shuffle is needed to make Quicksort stable.',
            'Shuffling ensures the aux[] array has no stale data.',
        ],
        correctIndex: 1,
        explanation: `The shuffle is Quicksort's safety mechanism:

  WITHOUT shuffle:
    Already-sorted array [1,2,3,...,N]:
    • pivot = a[lo] = 1 (the minimum!)
    • All N-1 other elements go to the RIGHT partition
    • Partition sizes: 0 and N-1 → terrible split!
    • Recursion depth: N → N²/2 comparisons 💥

  This can happen with ANY deterministic input pattern.
  Malicious input can deliberately trigger worst case.

  WITH shuffle:
    StdRandom.shuffle(a);  // randomize FIRST
    sort(a, 0, a.length - 1);

  Now the probability of always getting the minimum pivot is:
    P = (1/N) · (1/(N-1)) · ... = 1/N! ≈ 0 for large N

  Sedgewick: "More likely that your computer is struck by
  a lightning bolt" than hitting worst-case after shuffling.

  The shuffle converts deterministic worst-case inputs into
  a probabilistic guarantee with overwhelming confidence.`,
        diagram: false,
    },
    {
        id: 43,
        algo: 'quick',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'What is "Tukey\'s ninther" and why does Sedgewick\'s engineering system sort use it?',
        options: [
            'A technique to sort 9 elements optimally in the minimum number of comparisons.',
            'The median of 3 medians (each from groups of 3) — a cheap approximation of the true median that gives better pivots than median-of-3.',
            'A method to handle arrays with exactly 9 distinct keys.',
            'A way to split the array into 9 equal parts for parallel sorting.',
        ],
        correctIndex: 1,
        explanation: `Tukey's ninther (from Bentley-McIlroy engineering article):

  Step 1: Take 9 evenly-spaced entries from the array
    R L A | P M C | G A X
    ↑3 groups of 3↑

  Step 2: Find the median of each group of 3
    median(R,L,A)=L, median(P,M,C)=M, median(G,A,X)=G

  Step 3: Find the median of those 3 medians
    median(L, M, G) = M  ← this is the ninther pivot

  WHY?
  • Uses at most 12 comparisons
  • Approximates the true median of 9 values
  • Much better partition quality than median-of-3 (3 comparisons)
  • Prevents "killer sequences" that fool simpler pivot strategies

  Sedgewick: "Better partitioning than random shuffle and less costly."
  Used in production C, C++, and Java 6 sort implementations.`,
        diagram: true,
    },

    // ── COMPARATOR INTERFACE ──────────────────────────────────────────────────
    {
        id: 44,
        algo: 'selection',
        difficulty: 'medium',
        category: 'Java-Specific',
        question: 'What is the difference between the Comparable and Comparator interfaces in Java, from Sedgewick\'s perspective?',
        options: [
            'Comparable is for primitives; Comparator is for Objects.',
            'Comparable defines a type\'s natural order (built into the class); Comparator defines an alternate order (external, one per sort key).',
            'Comparable is slower because it uses reflection; Comparator is faster.',
            'There is no practical difference — both achieve the same result.',
        ],
        correctIndex: 1,
        explanation: `Sedgewick's distinction:

  Comparable — NATURAL order (baked into the class):
    public class Date implements Comparable<Date> {
      public int compareTo(Date that) { ... }
    }
    Arrays.sort(dates);  ← uses natural order

  Comparator — ALTERNATE order (external, flexible):
    public class Student {
      public static final Comparator<Student> BY_NAME = new ByName();
      public static final Comparator<Student> BY_SECTION = new BySection();
    }
    Arrays.sort(students, Student.BY_NAME);    ← sort by name
    Arrays.sort(students, Student.BY_SECTION); ← sort by section

  KEY insight: Comparator DECOUPLES the data type definition
  from the sort ordering. One class can have many Comparators!

  Sedgewick: "Decouples the definition of the data type from the
  definition of what it means to compare two objects of that type."`,
        diagram: false,
    },
    {
        id: 45,
        algo: 'selection',
        difficulty: 'hard',
        category: 'Java-Specific',
        question: 'What property must a Comparator implement, and what famous Java violation of this property exists?',
        options: [
            'It must implement Serializable — Java requires this for sorting.',
            'It must be a total order (antisymmetry, transitivity, totality) — violated by the Microsoft browser ballot implementation that used random returns.',
            'It must return exactly -1, 0, or +1 — no other values are allowed.',
            'It must be consistent with equals() — Java enforces this at compile time.',
        ],
        correctIndex: 1,
        explanation: `Comparator must define a TOTAL ORDER:
  • Antisymmetry: if v ≤ w and w ≤ v, then v = w
  • Transitivity:  if v ≤ w and w ≤ x, then v ≤ x
  • Totality:      either v ≤ w or w ≤ v (or both)

  The Microsoft Browser Ballot BUG:
  Microsoft used this comparator to "randomize" browser order:

    function RandomSort(a, b) {
      return (0.5 - Math.random());  // returns random +/- value!
    }

  This VIOLATES transitivity and antisymmetry!
  The "random" comparator can say: A < B, B < C, but C < A.
  → Sorting algorithms behave unpredictably/incorrectly.

  Result: Internet Explorer appeared LAST 50% of the time —
  not the "random" distribution Microsoft intended.

  Sedgewick's entry on Comparator: "Required property: Must be a total order."

  Also note: double's <= is NOT a total order because
  (Double.NaN <= Double.NaN) is false — violating totality!`,
        diagram: false,
    },

    // ── KNUTH SHUFFLE / RANDOMIZATION ─────────────────────────────────────────
    {
        id: 46,
        algo: 'selection',
        difficulty: 'medium',
        category: 'Conceptual',
        question: 'What is the Knuth (Fisher-Yates) shuffle, and what does it guarantee?',
        options: [
            'Pick a random pivot and partition — this shuffles the array efficiently.',
            'In iteration i, pick a random index r between 0 and i (inclusive), then swap a[i] and a[r] — this produces a uniformly random permutation in O(N) time.',
            'Sort the array by random numbers generated for each element — this guarantees uniformity.',
            'Repeatedly swap random pairs until the array looks shuffled.',
        ],
        correctIndex: 1,
        explanation: `Knuth Shuffle (Fisher-Yates, 1938):

  for (int i = 0; i < N; i++) {
    int r = StdRandom.uniform(i + 1);  // random between 0 and i
    exch(a, i, r);
  }

  GUARANTEE: "Produces a uniformly random permutation of
  the input array in linear time." — Sedgewick

  Common bugs Sedgewick warns about:
  ❌ Bug 1: r between 0 and N-1 (instead of 0 to i)
     → NOT uniform, last card can't end up last
  ❌ Bug 2: swap a[i] with a[r] where r between i and N-1
     → Different variant, equally correct but less discussed
  ❌ Bug 3: seed from milliseconds → only 86.4M possible shuffles
     (exploited by the online poker hack!)

  The online poker site used r = random(51) (between 1 and 51,
  not 0 to i) → NON-uniform shuffle → cheaters could predict cards!`,
        diagram: false,
    },

    // ── CONVEX HULL / SORTING APPLICATION ────────────────────────────────────
    {
        id: 47,
        algo: 'selection',
        difficulty: 'hard',
        category: 'Conceptual',
        question: 'In the Graham Scan convex hull algorithm, what role does sorting play, and which sorting algorithm does Sedgewick recommend?',
        options: [
            'Sorting is used to find the minimum y-coordinate point — Selection Sort is ideal.',
            'Points are sorted by polar angle relative to the lowest point, then scanned to keep only counterclockwise turns — Mergesort is recommended for O(N log N) time.',
            'Points are sorted by x-coordinate to enable binary search.',
            'Sorting is not needed — Graham Scan uses a priority queue instead.',
        ],
        correctIndex: 1,
        explanation: `Graham Scan algorithm (from Sedgewick Ch 2.1):

  Step 1: Find point p with smallest y-coordinate
          (use total order comparator on y)
  Step 2: Sort all other points by POLAR ANGLE w.r.t. p
          (use a Comparator with CCW-based comparison)
  Step 3: Scan points in order, keeping only CCW turns
          (discard points that create clockwise turns)

  Why Mergesort?
    Sedgewick: "Q: How to sort efficiently? A: Mergesort sorts
    in N log N time." → Used to sort by polar angle in Step 2.

  The polar angle Comparator uses the CCW cross-product test
  instead of trigonometric functions (atan2):
    2×Area(a,b,c) = (bx-ax)(cy-ay) - (by-ay)(cx-ax)
    > 0 → counterclockwise
    < 0 → clockwise
    = 0 → collinear

  This avoids the expensive and imprecise atan2() function!`,
        diagram: false,
    },

    // ── QUICK-SELECT ──────────────────────────────────────────────────────────
    {
        id: 48,
        algo: 'quick',
        difficulty: 'hard',
        category: 'Complexity',
        question: 'What is Quick-select, and what is its average-case time complexity?',
        options: [
            'An algorithm to find the kth smallest element using partitioning — O(N log N) average.',
            'An algorithm to find the kth smallest element using partitioning — O(N) average, only recursing on ONE side.',
            'Quick-select is just another name for Quick Sort applied to a subarray.',
            'An algorithm to find the kth smallest in O(log N) using binary search.',
        ],
        correctIndex: 1,
        explanation: `Quick-select — finding the kth smallest element:

  Algorithm:
  while (hi > lo) {
    int j = partition(a, lo, hi);
    if      (j < k) lo = j + 1;  // kth is in RIGHT partition
    else if (j > k) hi = j - 1;  // kth is in LEFT partition
    else            return a[k]; // found it!
  }

  KEY DIFFERENCE from Quicksort:
  After partitioning → recurse on ONE side only (not both)!

  Average-case: O(N) — each partition roughly halves the problem:
    N + N/2 + N/4 + ... = 2N comparisons ≈ O(N) ✅

  Exact formula (Sedgewick):
    C_N = 2N + 2k·ln(N/k) + 2(N-k)·ln(N/(N-k))
    ≈ (2 + 2·ln2) N  for finding the median

  Worst case: still O(N²) — but random shuffle prevents this.

  Theoretical result (Blum et al., 1973): linear worst-case
  exists, but constants are too large for practical use.`,
        diagram: true,
    },

    // ── SORTING SUMMARY TABLE ─────────────────────────────────────────────────
    {
        id: 49,
        algo: 'merge',
        difficulty: 'medium',
        category: 'Complexity',
        question: 'From Sedgewick\'s sorting summary table, which algorithm provides a guaranteed O(N log N) worst-case with stability, but is NOT in-place?',
        options: [
            'Quicksort — it has O(N log N) average case and is stable.',
            'Shell Sort — it is stable and O(N log N) worst case.',
            'Mergesort — it guarantees O(N log N) all cases and is stable, but requires O(N) extra space.',
            'Insertion Sort — it is stable and can achieve O(N log N) with binary insertion.',
        ],
        correctIndex: 2,
        explanation: `Sedgewick's sorting summary table:

  Algorithm  | In-place? | Stable? | Worst    | Average  | Best
  -----------|-----------|---------|----------|----------|--------
  Selection  | ✅        | ❌      | N²/2     | N²/2     | N²/2
  Insertion  | ✅        | ✅      | N²/2     | N²/4     | N
  Shell      | ✅        | ❌      | N^(3/2)  | ?        | N
  Merge Sort | ❌        | ✅      | N lg N   | N lg N   | N lg N  ← YOU ARE HERE
  Quicksort  | ✅        | ❌      | N²/2     | 2N ln N  | N lg N
  3-way Quick| ✅        | ❌      | N²/2     | 2N ln N  | N

  ??? (grail)| ✅        | ✅      | N lg N   | N lg N   | N lg N  ← doesn't exist!

  Mergesort is the ONLY algorithm in the table that achieves:
  ✅ Guaranteed O(N log N) worst case
  ✅ Stable
  ❌ But: NOT in-place (requires O(N) auxiliary array)

  The "holy sorting grail" (✅ in-place, ✅ stable, O(N log N) worst)
  remains undiscovered in practical form.`,
        diagram: false,
    },
    {
        id: 50,
        algo: 'quick',
        difficulty: 'hard',
        category: 'Complexity',
        question: 'Sedgewick\'s "Achilles heel" section reveals that Java\'s system sort (based on Bentley-McIlroy Quicksort) has a flaw. What is it?',
        options: [
            'Java\'s sort is O(N²) on already-sorted arrays.',
            'A specific "killer input" sequence can overflow the call stack (StackOverflowError) by triggering O(N) recursion depth.',
            'Java\'s sort is not stable, causing incorrect output for Objects.',
            'Java\'s sort cannot handle negative numbers.',
        ],
        correctIndex: 1,
        explanation: `From Sedgewick's "Achilles heel" section:

  The Bentley-McIlroy Quicksort (used by Java 6 Arrays.sort for
  primitives) was discovered to have a killer input:

  % java IntegerSort 250000 < 250000.txt
  Exception in thread "main"
  java.lang.StackOverflowError
    at java.util.Arrays.sort1(Arrays.java:562)
    at java.util.Arrays.sort1(Arrays.java:606)
    at java.util.Arrays.sort1(Arrays.java:608)
    ...

  What happened?
  • 250,000 integers constructed as a "killer sequence"
  • Triggered O(N) recursion depth despite Tukey's ninther
  • Stack overflow BEFORE the sort could complete!
  • Would have been O(N²) if it didn't crash first

  This is a real-world example proving that even highly-engineered
  sorts can have adversarial inputs. Sedgewick uses this to argue
  for the importance of random shuffling before sorting.`,
        diagram: false,
    },
];

export const ALGO_FILTER_OPTIONS = [
    { id: 'all', label: '🎯 All Algorithms' },
    { id: 'selection', label: '🔵 Selection Sort' },
    { id: 'insertion', label: '🟣 Insertion Sort' },
    { id: 'shell', label: '🟠 Shell Sort' },
    { id: 'merge', label: '🔷 Merge Sort' },
    { id: 'quick', label: '🩵 Quick Sort' },
];

export const DIFFICULTY_COLORS = {
    easy: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.3)', color: '#10b981', label: '⭐ Easy' },
    medium: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.3)', color: '#f59e0b', label: '⭐⭐ Medium' },
    hard: { bg: 'rgba(244,63,94,0.12)', border: 'rgba(244,63,94,0.3)', color: '#f43f5e', label: '⭐⭐⭐ Hard' },
};

export const CATEGORY_COLORS = {
    'Conceptual': { color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
    'Complexity': { color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
    'Stability': { color: '#a78bfa', bg: 'rgba(167,139,250,0.1)' },
    'Java-Specific': { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    'In-Place': { color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
};
