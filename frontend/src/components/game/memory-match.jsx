import React, { useEffect, useState } from "react";
import SoundManager from "@/components/game/sound-manager";

const EMOJIS = [
  "🍎","🍌","🍇","🍒","🍍","🥝","🍉","🍑"
];

function shuffle(arr) {
  return arr
    .map((v) => ({ v, r: Math.random() }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.v);
}

export default function MemoryMatch({ pairs = 6 }) {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matchedCount, setMatchedCount] = useState(0);

  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function reset() {
    const picked = EMOJIS.slice(0, pairs);
    const dup = shuffle([...picked, ...picked]);
    setCards(dup.map((val, i) => ({ id: i, val, matched: false })));
    setFlipped([]);
    setMatchedCount(0);
  }

  function onFlip(idx) {
    if (flipped.includes(idx) || cards[idx].matched) return;
    SoundManager.play('click');
    const next = [...flipped, idx];
    setFlipped(next);
    if (next.length === 2) {
      const [a, b] = next;
      if (cards[a].val === cards[b].val) {
        // match
        setTimeout(() => {
          setCards((c) => c.map((card) => card.val === cards[a].val ? { ...card, matched: true } : card));
          setMatchedCount((m) => m + 1);
          setFlipped([]);
          SoundManager.play('match');
        }, 360);
      } else {
        // flip back
        setTimeout(() => setFlipped([]), 520);
      }
    }
  }

  useEffect(() => {
    if (matchedCount === pairs) {
      SoundManager.play('win');
    }
  }, [matchedCount, pairs]);

  return (
    <div className="memory-root">
      <div style={{ fontWeight: 800, color: '#34d399' }}>Matches: {matchedCount}/{pairs}</div>

      <div className="memory-grid" role="grid">
        {cards.map((card, i) => {
          const isFlipped = flipped.includes(i) || card.matched;
          return (
            <button
              key={card.id}
              className={`memory-card ${isFlipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''}`}
              onClick={() => onFlip(i)}
              aria-pressed={isFlipped}
            >
              <div className="memory-face memory-front">{card.val}</div>
              <div className="memory-face memory-back">🎴</div>
            </button>
          );
        })}
      </div>

      <div className="memory-controls">
        <button className="mole-btn" onClick={reset}>Restart</button>
      </div>
    </div>
  );
}
