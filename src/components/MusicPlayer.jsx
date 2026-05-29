import { useState } from "react";
import UrlInput from "./UrlInput";
import FullAudioPlayer from "./FullAudioPlayer";
import CanvasView from "./CanvasView";
import Interpretation from "./Interpretation";

export default function MusicPlayer() {
  const [audioUrl, setAudioUrl] = useState("");
  const [audioState, setAudioState] = useState({
    current: 0,
    duration: 0,
    isPlaying: false,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 40,
        gap: 20,
      }}
    >
      <UrlInput onUrlSelected={setAudioUrl} />

      <FullAudioPlayer
        audioUrl={audioUrl}
        onStateChange={setAudioState}
      />

      <CanvasView audioState={audioState} />

      <Interpretation audioState={audioState} audioUrl={audioUrl} />
    </div>
  );
}
