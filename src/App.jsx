import { useState, useEffect, useRef, useCallback } from 'react';
import { startGame } from './game.js';

const TOTAL_ARROWS = 5;

export default function App() {
  const mount = useRef(null);
  const [round, setRound] = useState(0);
  const [state, setState] = useState({ pts: null, total: 0, shots: 0 });
  const [flash, setFlash] = useState(0);
  const onShot = useCallback((s) => { setState(s); setFlash((f) => f + 1); }, []);

  useEffect(() => {
    setState({ pts: null, total: 0, shots: 0 });
    return startGame(mount.current, onShot);
  }, [round, onShot]);

  const done = state.shots >= TOTAL_ARROWS && state.pts !== null;
  const left = TOTAL_ARROWS - state.shots;
  const restart = () => setRound((r) => r + 1);

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <div ref={mount} style={{ position: 'absolute', inset: 0 }} />
      <div className="hud">
        <div className="card">
          <div className="score">Your score is: <b>{state.total}</b></div>
          <div className="sub">Arrows left: {Math.max(left, 0)} / {TOTAL_ARROWS}</div>
        </div>
        <div className="card sub">Rings: 0 · 5 · 10 · 15 · 20 (centre)</div>
      </div>
      {state.pts !== null && !done && (
        <div className="last" key={flash}>{state.pts === 0 ? 'Miss! 0' : '+' + state.pts}</div>
      )}
      {done && (
        <div className="over">
          <h1>Your score is: {state.total}</h1>
          <div className="sub">Out of a possible {TOTAL_ARROWS * 20}</div>
          <button onClick={restart}>Play again</button>
        </div>
      )}
      <div className="bottom">
        <div className="hint">Move to aim, click / tap / Space to shoot. The sight sways.</div>
        <button onClick={restart}>Restart</button>
      </div>
    </div>
  );
}
