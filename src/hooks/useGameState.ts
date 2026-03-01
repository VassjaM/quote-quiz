import { useState, useCallback, useEffect } from "react";
import confetti from "canvas-confetti";
import { GameState, ThemeState, CurrentQuote } from "../types";

const HISTORY_MAX = 10;
const LS_KEY = "kanye-quiz-best-streak";

interface UseGameStateReturn {
  state: GameState;
  theme: ThemeState;
  answer: (guessedReal: boolean) => void;
  isAnimating: boolean;
}

export function useGameState(
  currentQuote: CurrentQuote | null,
  fetchQuote: () => Promise<void>,
): UseGameStateReturn {
  const [state, setState] = useState<GameState>({
    score: 0,
    played: 0,
    streak: 0,
    bestStreak: parseInt(localStorage.getItem(LS_KEY) ?? "0", 10),
    history: [],
    phase: "idle",
    lastCorrect: null,
    quoteIndex: 0,
  });

  const [theme, setTheme] = useState<ThemeState>("neutral");
  const [isAnimating, setIsAnimating] = useState(false);

  // at the start of the game, load the first quote
  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const triggerConfetti = useCallback((streak: number) => {
    confetti({
      particleCount: streak >= 3 ? 120 : 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#d4a843", "#4ade80", "#f0ece4", "#e8c06a"],
      ticks: 200,
    });
    if (streak >= 3) {
      setTimeout(() => {
        confetti({
          particleCount: 40,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#d4a843", "#4ade80"],
        });
        confetti({
          particleCount: 40,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#d4a843", "#4ade80"],
        });
      }, 300);
    }
  }, []);

  const answer = useCallback(
    (guessedReal: boolean) => {
      if (isAnimating || !currentQuote) return;
      setIsAnimating(true);

      // correct, when user pressed "real" and quote is real
      //           OR quote is fake and user pressed fake
      const correct = guessedReal === currentQuote.isReal;

      setState((prev) => {
        const newStreak = correct ? prev.streak + 1 : 0;
        const newBestStreak = Math.max(prev.bestStreak, newStreak);
        const newHistory = [...prev.history, correct].slice(-HISTORY_MAX);

        if (newBestStreak > prev.bestStreak) {
          localStorage.setItem(LS_KEY, String(newBestStreak));
        }

        return {
          ...prev,
          score: correct ? prev.score + 1 : prev.score,
          played: prev.played + 1,
          streak: newStreak,
          bestStreak: newBestStreak,
          history: newHistory,
          phase: "answered",
          lastCorrect: correct,
          quoteIndex: prev.quoteIndex + 1,
        };
      });

      if (correct) {
        setTheme("correct");
        setTimeout(() => {
          setState((s) => {
            triggerConfetti(s.streak);
            return s;
          });
        }, 50);
      } else {
        setTheme("wrong");
      }

      // load next quote after a short delay to let the user see the result
      setTimeout(async () => {
        setTheme("neutral");
        setState((prev) => ({ ...prev, phase: "loading", lastCorrect: null }));
        await fetchQuote();
        setState((prev) => ({ ...prev, phase: "idle" }));
        setIsAnimating(false);
      }, 1800);
    },
    [isAnimating, currentQuote, fetchQuote, triggerConfetti],
  );

  return { state, theme, answer, isAnimating };
}
