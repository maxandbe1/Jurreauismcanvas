import React, { useRef, useEffect } from "react";

export default function CanvasView({ playbackState }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      const { width, height } = canvas;
      const t = playbackState.progress || 0;
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.2);

      const left = `rgba(60, 90, 200, ${0.4 + pulse * 0.4})`;
      const right = `rgba(230, 120, 180, ${0.4 + pulse * 0.4})`;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, left);
      gradient.addColorStop(0.5, "rgba(255,255,255,0.3)");
      gradient.addColorStop(1, right);

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      requestAnimationFrame(render);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    render();

    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [playbackState]);

  return <canvas ref={canvasRef} className="canvas-surface" />;
}
