import React, { useState, useCallback } from "react";
import MusicPlayer from "./components/MusicPlayer.jsx";
import CanvasView from "./components/CanvasView.jsx";
import InterpretationPanel from "./components/InterpretationPanel.jsx";
import { generateInterpretation } from "./lib/interpretationEngine.js";

const DEMO_TRACK = {
  title: "How Are You — Mvmuro",
  src: "/demo/how-are-you.mp3",
  meta: {
    tempo: 82,
    energy: 0.6,
    mood: "introspective",
    key: "minor"
  }
};

export default function App() {
  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    progress: 0,
    duration: 0
  });

  const [interpretation, setInterpretation] = useState(
    generateInterpretation({ trackMeta: DEMO_TRACK.meta, playbackState })
  );

  const handlePlaybackChange = useCallback(
    (state) => {
      setPlaybackState(state);
      const next = generateInterpretation({
        trackMeta: DEMO_TRACK.meta,
        playbackState: state
      });
      setInterpretation(next);
    },
    []
  );

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Jurreauism Canvas Music</h1>
        <p>Music → Canvas → ME / US / WE</p>
      </header>

      <main className="app-main">
        <section className="app-left">
          <MusicPlayer track={DEMO_TRACK} onPlaybackChange={handlePlaybackChange} />
          <InterpretationPanel interpretation={interpretation} track={DEMO_TRACK} />
        </section>

        <section className="app-right">
          <CanvasView track={DEMO_TRACK} playbackState={playbackState} />
        </section>
      </main>
    </div>
  );
}
