import { useState } from "react";
import UrlInput from "./components/UrlInput";
import FullAudioPlayer from "./components/FullAudioPlayer";

export default function App() {
  const [audioUrl, setAudioUrl] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <UrlInput onUrlSelected={setAudioUrl} />
      <FullAudioPlayer audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
    </div>
  );
}
