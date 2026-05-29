import { useState } from "react";
import UrlInput from "./components/UrlInput";
import FullAudioPlayer from "./components/FullAudioPlayer";

export default function App() {
  const [audioUrl, setAudioUrl] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 40,
      }}
    >
      <UrlInput onUrlSelected={setAudioUrl} />
      <FullAudioPlayer audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
    </div>
  );
}
