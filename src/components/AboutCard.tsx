import { useState, useEffect, useRef } from "react";

interface ToastState {
  visible: boolean;
  exiting: boolean;
}

export default function AboutCard() {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    exiting: false,
  });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ visible: true, exiting: false });

    timerRef.current = setTimeout(() => {
      setToast({ visible: true, exiting: true });
      setTimeout(() => setToast({ visible: false, exiting: false }), 400);
    }, 3500);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <>
      <div className="card card-about">
        <span className="annotation">about</span>
        <button
          className="about-btn"
          onClick={showToast}
          aria-label="Show info"
        >
          <span className="about-icon">?</span>
        </button>
        <div className="about-title">How to play</div>
      </div>

      {toast.visible && (
        <div
          className={`toast ${toast.exiting ? "toast-exit" : "toast-enter"}`}
        >
          <div className="toast-emoji">🎤</div>
          <div className="toast-content">
            <div className="toast-title">How to play</div>
            <div className="toast-body">
              A Kanye quote appears — you decide if it's <strong>real</strong>{" "}
              or <strong>fake</strong>. Every quote from the API is real. Try
              not to get fooled!
            </div>
          </div>
          <button
            className="toast-close"
            onClick={() => setToast({ visible: true, exiting: true })}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}