import React, { useState, useCallback } from "react";
import MusicPlayer from "./components/MusicPlayer.jsx";
import CanvasView from "./components/CanvasView.jsx";
import InterpretationPanel from "./components/InterpretationPanel.jsx";
import UploadInput from "./components/UploadInput.jsx";
import UrlInput from "./components/UrlInput.jsx";
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
  const [currentTrack, setCurrentTrack] = useState(DEMO_TRACK);

  const [playbackState, setPlaybackState] = useState({
    isPlaying: false,
    progress: 0,
    duration: 0
  });

  const [interpretation, setInterpretation] = useState(
    generateInterpretation({
      trackMeta: DEMO_TRACK.meta,
      playbackState: playbackState
    })
  );

  const handlePlaybackChange = useCallback(
    (state) => {
      setPlaybackState(state);

      const next = generateInterpretation({
        trackMeta: currentTrack.meta,
        playbackState: state
      });

      setInterpretation(next);
    },
    [currentTrack]
  );

  const handleFileSelected = (track) => {
    setCurrentTrack(track);

    const next = generateInterpretation({
      trackMeta: track.meta,
      playbackState: { isPlaying: false, progress: 0 }
    });

    setInterpretation(next);

    setPlaybackState({
      isPlaying: false,
      progress: 0,
      duration: 0
    });
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <h1>Jurreauism Canvas Music</h1>
        <p>Music → Canvas → ME / US / WE</p>
      </header>

      <main className="app-main">
        <section className="app-left">

          {/* URL INPUT — placed ABOVE MusicPlayer exactly as you requested */}
          <UrlInput onUrlSelected={handleFileSelected} />

          {/* FILE UPLOAD */}
          <UploadInput onFileSelected={handleFileSelected} />

          {/* MUSIC PLAYER */}
          <MusicPlayer
            track={currentTrack}
            onPlaybackChange={handlePlaybackChange}
          />

          {/* INTERPRETATION */}
          <InterpretationPanel
            interpretation={interpretation}
            track={currentTrack}
          />
        </section>

        <section className="app-right">
          <CanvasView
            track={currentTrack}
            playbackState={playbackState}
          />
        </section>
      </main>
    </div>
  );
}
