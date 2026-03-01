import { useEffect, useRef, useState } from "react";
import type { CurrentQuote, GamePhase } from "../types";

interface Props {
  currentQuote: CurrentQuote | null;
  loading: boolean;
  phase: GamePhase;
  quoteIndex: number;
  lastCorrect: boolean | null;
  onAnswer: (guessedReal: boolean) => void;
}

export default function QuoteCard({
  currentQuote,
  loading,
  phase,
  quoteIndex,
  lastCorrect,
  onAnswer,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [displayQuote, setDisplayQuote] = useState<CurrentQuote | null>(null);
  const [textVisible, setTextVisible] = useState(true);

  // Animate quote text change
  useEffect(() => {
    if (!currentQuote) return;
    setTextVisible(false);
    const t = setTimeout(() => {
      setDisplayQuote(currentQuote);
      setTextVisible(true);
    }, 250);
    return () => clearTimeout(t);
  }, [currentQuote]);

  // flash card on answer
  useEffect(() => {
    const card = cardRef.current;
    if (!card || phase !== "answered") return;
    const cls = lastCorrect ? "correct-flash" : "wrong-flash";
    card.classList.add(cls);
    const t = setTimeout(() => card.classList.remove(cls), 600);
    return () => clearTimeout(t);
  }, [phase, lastCorrect]);

  const hint = () => {
    if (loading || phase === "loading") return "loading next quote...";
    if (phase === "answered" && displayQuote) {
      const wasReal = displayQuote.isReal;
      if (lastCorrect) {
        return wasReal
          ? "✓ correct — it was a real Kanye quote!"
          : "✓ correct — it was a fake quote!";
      } else {
        return wasReal
          ? "✗ wrong — it was actually a real Kanye quote!"
          : "✗ wrong — it was actually a fake quote!";
      }
    }
    return "next quote auto-loads";
  };

  const feedbackText =
    phase === "answered" ? (lastCorrect ? "✦ CORRECT!" : "✕ WRONG") : "";

  return (
    <div className="card card-quote" ref={cardRef}>
      <span className="annotation">quote</span>

      {feedbackText && (
        <div
          className={`feedback-text ${lastCorrect ? "correct" : "wrong"} show`}
        >
          {feedbackText}
        </div>
      )}

      <div className="quote-tag">Quote #{quoteIndex} · Round 1</div>

      <div
        className="quote-text"
        style={{
          opacity: textVisible ? 1 : 0,
          transform: textVisible ? "translateY(0)" : "translateY(8px)",
          transition: "opacity 0.3s, transform 0.3s",
        }}
      >
        {loading || !displayQuote ? "..." : `"${displayQuote.text}"`}
      </div>

      <div className="quote-buttons">
        <button
          className="btn btn-real"
          disabled={phase === "answered" || phase === "loading" || loading}
          onClick={() => onAnswer(true)}
        >
          ✦ Real Kanye
        </button>
        <button
          className="btn btn-fake"
          disabled={phase === "answered" || phase === "loading" || loading}
          onClick={() => onAnswer(false)}
        >
          ✕ Fake Quote
        </button>
      </div>

      <div className="quote-hint">{hint()}</div>
    </div>
  );
}
