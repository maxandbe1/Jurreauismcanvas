import { useState } from "react";

export default function UrlInput({ onUrlSelected }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onUrlSelected(input.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "10px",
        width: "100%",
        marginBottom: "20px",
      }}
    >
      <input
        type="text"
        placeholder="Enter audio URL"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          flex: 1,
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #333",
          background: "#000",
          color: "#fff",
        }}
      />

      <button
        type="submit"
        style={{
          padding: "10px 16px",
          background: "#444",
          border: "none",
          borderRadius: "8px",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Load
      </button>
    </form>
  );
}
