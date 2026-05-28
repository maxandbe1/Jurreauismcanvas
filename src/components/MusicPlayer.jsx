import React, { useRef, useEffect, useState } from "react";

export default function MusicPlayer({ track, onPlaybackChange }) {
  const audioRef = useRef(null);

  const [localState, setLocalState] = useState({
    isPlaying: false,
    progress: 0,
    duration: 0
  });

  const updateState = (partial) => {
    setLocalState((prev) => {
      const next = { ...prev, ...partial };
      onPlaybackChange(next);
      return next;
    });
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play();
      updateState({ isPlaying: true });
    } else {
      audio.pause();
      updateState({ isPlaying: false });
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;

    updateState({
      progress: audio.currentTime,
      duration: audio.duration || 0
    });
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;

    updateState({
      duration: audio.duration || 0
    });
  };

  // Reset when track changes
  useEffect(() => {
    updateState({
      isPlaying: false,
      progress: 0,
      duration: 0
    });

    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
  }, [track?.src]);

  const progressPercent =
    localState.duration > 0
      ? (localState.progress / localState.duration) * 100
      : 0;

  return (
    <div className="music-player">
      <h2>{track?.title || "No Track Selected"}</h2>

      <audio
        ref={audioRef}
        src={track?.src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <button onClick={handlePlayPause} className="btn-primary">
        {localState.isPlaying ? "Pause" : "Play"}
      </button>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="time-row">
        <span>{localState.progress.toFixed(1)}s</span>
        <span>{localState.duration.toFixed(1)}s</span>
      </div>
    </div>
  );
}
