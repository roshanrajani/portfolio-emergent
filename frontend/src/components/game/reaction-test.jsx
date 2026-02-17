import React, { useEffect, useRef, useState } from "react";
import SoundManager from "@/components/game/sound-manager";

export default function ReactionTest() {
  const [state, setState] = useState('idle'); // idle | waiting | go | result
  const [best, setBest] = useState(null);
  const [last, setLast] = useState(null);
  const timerRef = useRef(null);
  const startAtRef = useRef(0);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const start = () => {
    setState('waiting');
    setLast(null);
    const delay = 800 + Math.random() * 2200;
    timerRef.current = setTimeout(() => {
      setState('go');
      startAtRef.current = performance.now();
      SoundManager.play('start');
    }, delay);
  };

  const tap = () => {
    if (state === 'waiting') {
      // too early
      clearTimeout(timerRef.current);
      setState('result');
      setLast('Too early!');
      SoundManager.play('gameover');
      return;
    }
    if (state === 'go') {
      const delta = performance.now() - startAtRef.current;
      setLast(Math.round(delta));
      setBest((b) => (b == null || delta < b ? Math.round(delta) : b));
      setState('result');
      SoundManager.play('win');
      return;
    }
    if (state === 'result' || state === 'idle') {
      start();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div style={{ fontWeight:800, color: '#60a5fa' }}>Best: {best ?? '--'} ms</div>
      <div className={`reaction-screen ${state}`} onClick={tap} role="button" tabIndex={0}>
        {state === 'idle' && 'Tap to start'}
        {state === 'waiting' && 'Wait...'}
        {state === 'go' && 'GO!'}
        {state === 'result' && (typeof last === 'number' ? `${last} ms — Tap to retry` : last)}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="mole-btn" onClick={() => { setBest(null); setLast(null); setState('idle'); }}>Reset</button>
      </div>
    </div>
  );
}
