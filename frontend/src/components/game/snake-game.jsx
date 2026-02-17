import React, { useEffect, useRef, useState } from "react";
import SoundManager from "@/components/game/sound-manager";

// Small, responsive Snake game component (canvas + on-screen controls for mobile)
export default function SnakeGame() {
  const canvasRef = useRef(null);
  const touchStartRef = useRef(null);
  const dirRef = useRef({ x: 1, y: 0 });
  const snakeRef = useRef([]);
  const appleRef = useRef({ x: 0, y: 0 });
  const intervalRef = useRef(null);

  const COLS = 20;
  const ROWS = 20;
  const [cellSize, setCellSize] = useState(16);
  const [score, setScore] = useState(0);
  const [running, setRunning] = useState(true);
  const [gameOver, setGameOver] = useState(false);

  // pick a random apple position not on the snake
  const randomApple = () => {
    const s = snakeRef.current;
    let p;
    do {
      p = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (s.some((seg) => seg.x === p.x && seg.y === p.y));
    return p;
  };

  const resetGame = () => {
    const startX = Math.floor(COLS / 2);
    const startY = Math.floor(ROWS / 2);
    snakeRef.current = [
      { x: startX, y: startY },
      { x: startX - 1, y: startY },
      { x: startX - 2, y: startY },
    ];
    dirRef.current = { x: 1, y: 0 };
    appleRef.current = randomApple();
    setScore(0);
    setGameOver(false);
    setRunning(true);
    requestAnimationFrame(draw);
  };

  useEffect(() => {
    const resize = () => {
      const containerWidth = Math.min(window.innerWidth * 0.88, 380);
      const cs = Math.max(8, Math.floor(containerWidth / COLS));
      setCellSize(cs);
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = cs * COLS;
        canvas.height = cs * ROWS;
        // redraw after resize
        requestAnimationFrame(draw);
      }
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    resetGame();

    const onKey = (e) => {
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          setDirection({ x: 0, y: -1 });
          break;
        case "ArrowDown":
        case "s":
        case "S":
          setDirection({ x: 0, y: 1 });
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          setDirection({ x: -1, y: 0 });
          break;
        case "ArrowRight":
        case "d":
        case "D":
          setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // main game loop
  useEffect(() => {
    const TICK = 110; // ms per move
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      if (!running || gameOver) return;
      step();
    }, TICK);
    return () => clearInterval(intervalRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, gameOver]);

  const setDirection = (d) => {
    const cur = dirRef.current;
    // prevent reversing directly
    if (cur.x + d.x === 0 && cur.y + d.y === 0) return;
    dirRef.current = d;
    SoundManager.play("move");
  };

  const step = () => {
    const head = {
      x: (snakeRef.current[0].x + dirRef.current.x + COLS) % COLS,
      y: (snakeRef.current[0].y + dirRef.current.y + ROWS) % ROWS,
    };

    // collision with body => game over
    if (snakeRef.current.some((s) => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      setRunning(false);
      SoundManager.play("gameover");
      return;
    }

    const ate = head.x === appleRef.current.x && head.y === appleRef.current.y;
    if (ate) {
      snakeRef.current = [head, ...snakeRef.current];
      appleRef.current = randomApple();
      setScore((s) => s + 1);
      SoundManager.play("eat");
    } else {
      snakeRef.current = [head, ...snakeRef.current.slice(0, -1)];
    }

    requestAnimationFrame(draw);
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const cs = Math.floor(canvas.width / COLS);

    // background
    ctx.fillStyle = "#071026"; // dark
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // grid (subtle)
    ctx.strokeStyle = "rgba(255,255,255,0.02)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= COLS; x++) {
      ctx.beginPath();
      ctx.moveTo(x * cs + 0.5, 0);
      ctx.lineTo(x * cs + 0.5, canvas.height);
      ctx.stroke();
    }

    for (let y = 0; y <= ROWS; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y * cs + 0.5);
      ctx.lineTo(canvas.width, y * cs + 0.5);
      ctx.stroke();
    }

    // apple
    ctx.fillStyle = "#ef4444";
    ctx.fillRect(appleRef.current.x * cs + 3, appleRef.current.y * cs + 3, cs - 6, cs - 6);

    // snake
    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? "#10b981" : "#34d399";
      ctx.fillRect(s.x * cs + 2, s.y * cs + 2, cs - 4, cs - 4);
    });
  };

  // touch/swipe handlers (mobile)
  const onTouchStart = (e) => {
    const t = e.touches[0];
    touchStartRef.current = { x: t.clientX, y: t.clientY };
  };
  const onTouchEnd = (e) => {
    const t = e.changedTouches[0];
    const start = touchStartRef.current;
    if (!start) return;
    const dx = t.clientX - start.x;
    const dy = t.clientY - start.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > 20) setDirection({ x: 1, y: 0 });
      else if (dx < -20) setDirection({ x: -1, y: 0 });
    } else {
      if (dy > 20) setDirection({ x: 0, y: 1 });
      else if (dy < -20) setDirection({ x: 0, y: -1 });
    }
    touchStartRef.current = null;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <div className="snake-score" style={{ fontWeight: 700, color: "#f59e0b" }}>Score: {score}</div>
      <canvas
        ref={canvasRef}
        className="snake-canvas"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        role="img"
        aria-label="Snake game canvas"
      />

      <div className="snake-controls" style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <button className="snake-btn" onClick={() => setDirection({ x: 0, y: -1 })} aria-label="Up">
          ↑
        </button>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="snake-btn" onClick={() => setDirection({ x: -1, y: 0 })} aria-label="Left">
            ←
          </button>
          <button className="snake-btn" onClick={() => setDirection({ x: 1, y: 0 })} aria-label="Right">
            →
          </button>
        </div>
        <button className="snake-btn" onClick={() => setDirection({ x: 0, y: 1 })} aria-label="Down">
          ↓
        </button>
      </div>

      <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
        <button
          className="snake-btn"
          onClick={() => {
            resetGame();
          }}
        >
          Restart
        </button>
        {gameOver && <div style={{ color: "#f87171", fontWeight: 700 }}>Game Over</div>}
      </div>
    </div>
  );
}
