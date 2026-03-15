# 🔢 AlgoTrace — Interactive Sorting Visualizer

An educational sorting visualizer built with **React + Vite**, combining passive visualization, active manual tracing, and an interactive quiz — all grounded in Sedgewick & Wayne's *Algorithms* (Ch. 2.1–2.3).

---

## ✨ Features

### 📊 Watch Mode
- Animated bar-chart visualization of the selected sort
- **Playback controls**: Play/Pause, Step Forward/Backward, Skip to Start/End
- **Speed slider**: 0.1× to 5×
- **Color-coded bars**:
  - 🔴 Red — elements being compared
  - 🟡 Amber — elements being swapped
  - 🟢 Green — elements in their final sorted position
  - 🟣 Purple — pivot element (Quicksort)
- **Live commentary** explaining each logical operation in plain English
- **Input controls**: custom comma-separated values, random presets, Best/Worst/Random case toggles

### 🎓 Exam Mode
- Spreadsheet-style **manual tracing worksheet** for each algorithm
- Enter the state of the array after every step
- **Hint system** and **Reveal Row** for guided practice
- Handles both numeric arrays and uppercase letter strings (A–Z)
- Helper columns for `lo`, `mid`, `hi`, `gap` depending on the algorithm
- Highlights correct/incorrect cells with feedback

### 🧠 Quiz Mode
- **50-question bank** drawn directly from the Sedgewick & Wayne textbook
- Questions across 5 categories:
  - **Conceptual** — Basic plans, invariants, divide & conquer
  - **Complexity** — Time/space analysis, recurrences, Big-O
  - **Stability** — Which algorithms are stable and why
  - **In-Place** — Formal definition (`≤ c log N` extra memory) and implications
  - **Java-Specific** — `Comparable`, `Comparator`, `assert`, `Arrays.sort` decisions
- **Configurable quiz setup**: filter by algorithm, difficulty (Easy/Medium/Hard), and question count (5–50)
- One question at a time with A/B/C/D multiple-choice options
- 💡 **Hint button** before submitting (nudges without giving the answer)
- Color-coded instant feedback with **ASCII diagram explanations** from the textbook
- 🔥 **Streak tracker** and live score badge
- **Results screen** with grade, accuracy, and per-question summary
- **Review screen** — expand any question to see your answer vs. correct + full explanation

### 📚 Educational Sidebar
- **Algorithm DNA**: time complexity (best/avg/worst), space, stability, in-place status
- **Live pseudocode** with line highlighting synced to Watch Mode steps
- **Case analysis**: what triggers best vs. worst case
- Step-by-step detail panel

---

## 🗂 Algorithms Covered

| Algorithm | Time (Avg) | Time (Worst) | Space | Stable | In-Place |
|---|---|---|---|---|---|
| Selection Sort | O(N²) | O(N²) | O(1) | ❌ | ✅ |
| Insertion Sort | O(N²) | O(N²) | O(1) | ✅ | ✅ |
| Shell Sort | O(N^1.3) | O(N^3/2) | O(1) | ❌ | ✅ |
| Merge Sort | O(N log N) | O(N log N) | O(N) | ✅ | ❌ |
| Quick Sort | O(N log N) | O(N²) | O(log N) | ❌ | ✅ |

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🏗 Project Structure

```
src/
├── algorithms/
│   ├── index.js          # Algorithm registry
│   ├── selectionSort.js
│   ├── insertionSort.js
│   ├── shellSort.js
│   ├── mergeSort.js
│   └── quickSort.js
├── components/
│   ├── WatchMode.jsx     # Bar-chart visualizer + controls (embedded in App.jsx)
│   ├── ExamMode.jsx      # Manual tracing worksheet
│   ├── QuizMode.jsx      # Interactive quiz with 50 questions
│   └── Sidebar.jsx       # Algorithm DNA + live pseudocode
├── data/
│   └── quizBank.js       # 50-question bank (Sedgewick Ch 2.1–2.3)
├── App.jsx
├── main.jsx
└── index.css
```

---

## 📖 Reference Material

All quiz questions and explanations are derived from:

> **Sedgewick, R. & Wayne, K.** — *Algorithms, 4th Edition*
> Part II: Sorting — Ch. 2.1 Elementary Sorts, Ch. 2.2 Mergesort, Ch. 2.3 Quicksort

---

## 🛠 Tech Stack

- [React 18](https://react.dev/) — UI framework
- [Vite](https://vitejs.dev/) — build tool & dev server
- Vanilla CSS — custom dark-theme design system (no Tailwind)
