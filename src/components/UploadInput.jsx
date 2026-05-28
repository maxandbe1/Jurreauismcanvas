import React from "react";

export default function UploadInput({ onFileSelected }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    onFileSelected({
      title: file.name,
      src: url,
      meta: {
        tempo: 90,
        energy: 0.5,
        mood: "unknown",
        key: "unknown"
      }
    });
  };

  return (
    <div className="upload-box">
      <label className="upload-label">
        Select MP3
        <input
          type="file"
          accept="audio/mp3,audio/mpeg"
          onChange={handleChange}
          className="upload-input"
        />
      </label>
    </div>
  );
}
