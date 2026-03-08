/* - COMPONENT FOR THE PROFILE CARD - */

import { useEffect, useState } from "react";
import type { GamePhase } from "../types";

interface Props {
  lastCorrect: boolean | null;
  phase: GamePhase;
}

export default function ProfileCard({ lastCorrect, phase }: Props) {
  const [avatar, setAvatar] = useState("😐");
  const [mood, setMood] = useState("Unimpressed");

  useEffect(() => {
    if (phase === "answered") {
      if (lastCorrect) {
        setAvatar("😤");
        setMood("That's right");
      } else {
        setAvatar("😒");
        setMood("Disappointed");
      }
    } else if (phase === "idle") {
      setAvatar("😐");
      setMood("Unimpressed");
    }
  }, [phase, lastCorrect]);

  return (
    <div className="card card-profile">
      <span className="annotation">profile</span>
      <div className="avatar">{avatar}</div>
      <div className="mood-label">{mood}</div>
      <div className="profile-name">Real or Fake?</div>
      <p className="profile-sub">
        Can you tell a real
        <br />
        Kanye quote apart
        <br />
        from a fake one?
      </p>
    </div>
  );
}
