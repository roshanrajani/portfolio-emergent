import React, { useEffect, useState, useRef } from "react";
import SoundManager from "@/components/game/sound-manager";

export default function WhackAMole({ duration = 20 }) {
  const HOLES = 9; // 3x3
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const moleTimerRef = useRef(null);

  const start = () => {
    setScore(0);
    setTimeLeft(duration);
    setRunning(true);
    SoundManager.play('start');
  };

  const stop = () => {
    setRunning(false);
    setVisibleIndex(-1);
    clearTimeout(moleTimerRef.current);
    clearInterval(intervalRef.current);
  };

  // game timer
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          setVisibleIndex(-1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [running]);

  // play final sound when round ends
  useEffect(() => {
    if (!running && timeLeft === 0) {
      if (score >= 5) SoundManager.play('win');
      else SoundManager.play('gameover');
    }
  }, [running, timeLeft, score]);

  // mole appearance loop
  useEffect(() => {
    if (!running) return;

    const show = () => {
      const next = Math.floor(Math.random() * HOLES);
      setVisibleIndex(next);
      SoundManager.play('pop');
      const upTime = 600 - Math.min(Math.random() * 400, 450); // 200-600ms
      moleTimerRef.current = setTimeout(() => {
        setVisibleIndex(-1);
        const wait = 250 + Math.random() * 700;
        moleTimerRef.current = setTimeout(show, wait);
      }, upTime);
    };

    show();
    return () => clearTimeout(moleTimerRef.current);
  }, [running]);

  const whack = (idx) => {
    if (!running) return;
    if (idx === visibleIndex) {
      setScore((s) => s + 1);
      SoundManager.play('whack');
      setVisibleIndex(-1);
      // small delay before next mole
      clearTimeout(moleTimerRef.current);
      moleTimerRef.current = setTimeout(() => {
        const wait = 120 + Math.random() * 600;
        moleTimerRef.current = setTimeout(() => setVisibleIndex(Math.floor(Math.random() * HOLES)), wait);
      }, 120);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(moleTimerRef.current);
      clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{ fontWeight: 800, color: "#34d399" }}>Score: {score}</div>
        <div style={{ color: "#f59e0b", fontWeight: 700 }}>Time: {timeLeft}s</div>
        <div>
          {!running ? (
            <button className="mole-btn" onClick={start}>Start</button>
          ) : (
            <button className="mole-btn" onClick={stop}>Stop</button>
          )}
          <button className="mole-btn" onClick={() => { stop(); start(); }} style={{ marginLeft: 8 }}>Restart</button>
        </div>
      </div>

      <div className="mole-grid" role="grid" aria-label="Whack a mole grid">
        {Array.from({ length: HOLES }).map((_, i) => (
          <button
            key={i}
            className={`mole-hole ${visibleIndex === i ? 'mole-up' : ''}`}
            onClick={() => whack(i)}
            aria-pressed={visibleIndex === i}
            aria-label={`Hole ${i + 1}`}
          >
            <div className="mole-head" />
          </button>
        ))}
      </div>

      {!running && timeLeft === 0 && (
        <div style={{ color: '#f87171', fontWeight: 800 }}>Time's up — score: {score}</div>
      )}
    </div>
  );
}
