import { useRef, useState, useEffect } from "react";

export default function FullAudioPlayer({ audioUrl, onStateChange }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const syncState = (next = {}) => {
    const state = {
      current,
      duration,
      isPlaying,
      ...next,
    };
    onStateChange && onStateChange(state);
  };

  const loadAudio = () => {
    if (!audioUrl) return;

    setError("");
    setLoading(true);
    setIsPlaying(false);
    setCurrent(0);
    setDuration(0);

    if (audioRef.current) {
      audioRef.current.src = audioUrl;
      audioRef.current.load();
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      syncState({ isPlaying: false });
    } else {
      audioRef.current.play();
      setIsPlaying(true);
      syncState({ isPlaying: true });
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    if (!audioRef.current) return;
    audioRef.current.currentTime = newTime;
    setCurrent(newTime);
    syncState({ current: newTime });
  };

  const format = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    syncState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, duration, isPlaying]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.dot} />
        <div style={styles.dot} />
        <div style={styles.dot} />
        <div style={styles.label}>Audio Module</div>
      </div>

      <button style={styles.loadBtn} onClick={loadAudio}>
        Load
      </button>

      <audio
        ref={audioRef}
        onLoadedMetadata={() => {
          const d = audioRef.current.duration;
          setDuration(d);
          setLoading(false);
          syncState({ duration: d });
        }}
        onTimeUpdate={() => {
          const c = audioRef.current.currentTime;
          setCurrent(c);
          syncState({ current: c });
        }}
        onError={() => {
          setError("Failed to load audio");
          setLoading(false);
        }}
        onEnded={() => {
          setIsPlaying(false);
          syncState({ isPlaying: false });
        }}
      />

      {loading && <div style={styles.status}>Loading…</div>}
      {error && <div style={styles.error}>{error}</div>}

      {!loading && !error && duration > 0 && (
        <>
          <div style={styles.controls}>
            <button style={styles.playBtn} onClick={togglePlay}>
              {isPlaying ? "Pause" : "Play"}
            </button>

            <div style={styles.time}>
              {format(current)} / {format(duration)}
            </div>
          </div>

          <input
            type="range"
            min="0"
            max={duration}
            value={current}
            onChange={handleSeek}
            style={styles.seek}
          />
        </>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    maxWidth: 480,
    padding: 20,
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    fontFamily: "Inter, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#333",
  },
  label: {
    marginLeft: 10,
    fontSize: 14,
    opacity: 0.7,
    letterSpacing: 0.5,
  },
  loadBtn: {
    padding: "10px 16px",
    background: "#444",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    cursor: "pointer",
    marginBottom: 20,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  playBtn: {
    padding: "8px 16px",
    background: "#fff",
    color: "#000",
    borderRadius: 8,
    border: "none",
    cursor: "pointer",
  },
  time: {
    fontSize: 14,
    opacity: 0.8,
  },
  seek: {
    width: "100%",
    marginTop: 12,
  },
  status: {
    marginTop: 10,
    color: "#aaa",
  },
  error: {
    marginTop: 10,
    color: "#ff5555",
  },
};
