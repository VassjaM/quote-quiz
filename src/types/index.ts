/* - GAME AND THEME TYPES - */

export type ThemeState = "neutral" | "correct" | "wrong";

export type GamePhase = "idle" | "answered" | "loading";

// isReal changes the quote origin
//true is API-Call
//false is local quote
export interface CurrentQuote {
  text: string;
  isReal: boolean;
}

export interface GameState {
  score: number;
  played: number;
  streak: number;
  bestStreak: number;
  history: boolean[];
  phase: GamePhase;
  lastCorrect: boolean | null;
  quoteIndex: number;
}
