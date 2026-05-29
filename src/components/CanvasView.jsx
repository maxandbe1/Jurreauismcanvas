import { useEffect, useRef } from "react";

export default function CanvasView({ audioState }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { current, duration, isPlaying } = audioState || {};

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#050505";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const progress = duration ? current / duration : 0;

    const barWidth = canvas.width * 0.8;
    const barHeight = 6;
    const x = (canvas.width - barWidth) / 2;
    const y = canvas.height / 2 - barHeight / 2;

    ctx.fillStyle = "#222";
    ctx.fillRect(x, y, barWidth, barHeight);

    ctx.fillStyle = isPlaying ? "#4ade80" : "#888";
    ctx.fillRect(x, y, barWidth * progress, barHeight);

    ctx.fillStyle = "#fff";
    ctx.globalAlpha = 0.6;
    ctx.font = "10px Inter, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(
      isPlaying ? "Streaming…" : "Idle",
      canvas.width / 2,
      y - 10
    );
    ctx.globalAlpha = 1;
  }, [audioState]);

  return (
    <canvas
      ref={canvasRef}
      width={480}
      height={120}
      style={{
        background: "#000",
        borderRadius: 12,
        border: "1px solid #222",
      }}
    />
  );
}
