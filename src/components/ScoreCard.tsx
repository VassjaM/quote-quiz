import { useEffect, useRef } from "react";

interface Props {
  score: number;
  played: number;
}

export default function ScoreCard({ score, played }: Props) {
  const scoreRef = useRef<HTMLDivElement>(null);
  const pct = played > 0 ? (score / played) * 100 : 0;

  useEffect(() => {
    const el = scoreRef.current;
    if (!el) return;
    el.classList.remove("pop");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => el.classList.add("pop")),
    );
    const handler = () => el.classList.remove("pop");
    el.addEventListener("animationend", handler, { once: true });
  }, [score]);

  return (
    <div className="card card-score">
      <span className="annotation">score</span>
      <div className="score-big" ref={scoreRef}>
        {score}
      </div>
      <div className="score-total">/ {played} played</div>
      <div className="score-bar-wrap">
        <div className="score-bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
