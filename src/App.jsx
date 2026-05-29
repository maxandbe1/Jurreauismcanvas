import { useState } from "react";
import FullAudioPlayer from "./components/FullAudioPlayer";

export default function App() {
  const [audioUrl, setAudioUrl] = useState("");

  return (
    <div style={{ padding: 20 }}>
      <FullAudioPlayer audioUrl={audioUrl} setAudioUrl={setAudioUrl} />
    </div>
  );
}
