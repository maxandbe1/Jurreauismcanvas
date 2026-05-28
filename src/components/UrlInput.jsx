import React, { useState } from "react";

export default function UrlInput({ onUrlSelected }) {
  const [url, setUrl] = useState("");
  const AUDIO_PROXY_BASE = "https://https://audio-proxy.maxandbe1.workers.dev/;



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;

    onUrlSelected({
      title: url,
      src: url,
      meta: {
        tempo: 90,
        energy: 0.5,
        mood: "unknown",
        key: "unknown"
      }
    });

    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="url-input-box">
      <input
        type="text"
        placeholder="Paste MP3 URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="url-input-field"
      />
      <button type="submit" className="btn-primary">
        Load
      </button>
    </form>
  );
}
