import { useEffect } from "react";

interface Props {
  onSkip: () => void;
}

export default function SkipCard({ onSkip }: Props) {
  // Spacebar shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        onSkip();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onSkip]);

  return (
    <button className="card card-skip" onClick={onSkip}>
      <span className="skip-icon">↻</span>
      <span className="skip-label">Skip Quote</span>
    </button>
  );
}
