import { useRef, useState } from "react";

export default function FullAudioPlayer({ audioUrl, setAudioUrl }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    const newTime = Number(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrent(newTime);
  };

  const format = (t) => {
    if (!t || isNaN(t)) return "0:00";
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Portal Audio Player</h2>

      {/* Load Button */}
      <button style={styles.loadBtn} onClick={loadAudio}>
        Load Audio
      </button>

      <audio
        ref={audioRef}
        onLoadedMetadata={() => {
          setDuration(audioRef.current.duration);
          setLoading(false);
        }}
        onTimeUpdate={() => setCurrent(audioRef.current.currentTime)}
        onError={() => {
          setError("Failed to load audio");
          setLoading(false);
        }}
        onEnded={() => setIsPlaying(false)}
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
    margin: "40px auto",
    padding: 20,
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    fontFamily: "Inter, sans-serif",
  },
  title: {
    marginBottom: 20,
    fontSize: 22,
    fontWeight: 600,
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
