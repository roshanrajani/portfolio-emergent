import React, { useEffect, useState } from "react";
import SoundManager from "@/components/game/sound-manager";

const LINES = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function checkWinner(board) {
  for (const [a,b,c] of LINES) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
  }
  if (board.every(Boolean)) return 'draw';
  return null;
}

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    setWinner(checkWinner(board));
  }, [board]);

  useEffect(() => {
    if (winner) {
      if (winner === 'draw') SoundManager.play('click');
      else SoundManager.play('win');
    }
  }, [winner]);

  const reset = () => {
    setBoard(Array(9).fill(null));
    setTurn('X');
    setWinner(null);
  };

  const playerMove = (i) => {
    if (board[i] || winner) return;
    const next = board.slice();
    next[i] = turn;
    setBoard(next);
    SoundManager.play('click');
    setTurn((t) => (t === 'X' ? 'O' : 'X'));
  };

  // basic CPU: choose random empty cell when it's O's turn
  useEffect(() => {
    if (winner) return;
    if (turn === 'O') {
      const empty = board.map((v, i) => v ? null : i).filter((v) => v !== null);
      if (empty.length === 0) return;
      const pick = empty[Math.floor(Math.random() * empty.length)];
      const timer = setTimeout(() => {
        const next = board.slice();
        next[pick] = 'O';
        setBoard(next);
        SoundManager.play('click');
        setTurn('X');
      }, 400 + Math.random() * 500);
      return () => clearTimeout(timer);
    }
  }, [turn, board, winner]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
      <div style={{ fontWeight: 800, color: '#f59e0b' }}>Turn: {turn}</div>
      <div className="ttt-grid">
        {board.map((v, i) => (
          <button key={i} className={`ttt-cell ${v ? 'filled' : ''}`} onClick={() => playerMove(i)}>
            {v}
          </button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="mole-btn" onClick={reset}>Restart</button>
      </div>
      {winner && <div style={{ fontWeight:800, color: '#ef4444' }}>Result: {winner}</div>}
    </div>
  );
}
