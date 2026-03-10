# Quote Quiz App

A sleek Kanye West quote quiz! Guess if each quote is real or made up. Built with React & TypeScript, featuring a bento-grid layout, confetti animations, and a persistent best streak tracker.

---

## Tech Stack

- **React** – UI & component architecture
- **TypeScript** – Type safety throughout
- **Vite** – Fast dev server & build tool
- **CSS Grid** – Bento-style responsive layout
- **canvas-confetti** – Confetti animation on correct answers
- **kanye.rest** – Live Kanye West quote API

---

## Features

-  Fetches real Kanye quotes live from [kanye.rest](https://api.kanye.rest)
-  Handwritten fake quotes mixed in at a 50/50 ratio
-  Streak tracker with persistent best streak via `localStorage`
-  Confetti burst on correct answers (more intense on streaks of 3+)
-  Spacebar shortcut to skip quotes
-  Fully responsive, optimized for mobile & desktop
-  Answer history with the last 10 results

---

## Process

I started by designing the bento-grid layout, then built out the core game logic using two custom hooks:

- `useKanyeQuote`  handles fetching real quotes from the API and selecting random fake quotes from a local JSON file, avoiding repeats until all fakes have been used.
- `useGameState`  manages the full game state: score, streak, history, phase transitions, and confetti triggering.

Each UI element is its own isolated component, keeping the codebase modular and easy to extend. Styling is done entirely in plain CSS with CSS custom properties for theming.

---

## What I Learned

### Custom Hooks in React
Separating concerns into `useKanyeQuote` and `useGameState` taught me how to keep components clean and move complex logic out of the UI layer. Managing async state, refs, and callbacks inside hooks was a valuable exercise.

### TypeScript & Types
Using `verbatimModuleSyntax` forced me to be precise about type-only imports (`import type`). Defining shared types in a central `types.ts` file and using them across hooks and components made the codebase significantly more robust.

---

## Running the Project

```bash
# Clone the repository
git clone https://github.com/VassjaM/quote-quiz.git
cd quote-quiz

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app runs on `http://localhost:5173` by default.

---

## License

MIT © [VassjaM](https://github.com/VassjaM)
