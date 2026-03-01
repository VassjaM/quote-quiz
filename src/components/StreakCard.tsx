import { useEffect, useRef } from "react";

interface Props {
  streak: number;
}

export default function StreakCard({ streak }: Props) {
  const fireRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = fireRef.current;
    if (!el) return;
    el.classList.remove("bounce");
    requestAnimationFrame(() =>
      requestAnimationFrame(() => el.classList.add("bounce")),
    );
    const handler = () => el.classList.remove("bounce");
    el.addEventListener("animationend", handler, { once: true });
  }, [streak]);

  return (
    <div className="card card-streak">
      <span className="annotation">streak</span>
      <span className="streak-fire" ref={fireRef}>
        {streak === 0 ? "💀" : "🔥"}
      </span>
      <div className="streak-num">{streak}</div>
      <div className="streak-label">in a row</div>
    </div>
  );
}
