import React from "react";

export default function InterpretationPanel({ interpretation, track }) {
  return (
    <div className="interpretation-panel">
      <h3>What this song says</h3>
      <p className="track-label">{track.title}</p>

      <div className="interp-block">
        <h4>ME</h4>
        <p>{interpretation.me}</p>
      </div>

      <div className="interp-block">
        <h4>US</h4>
        <p>{interpretation.us}</p>
      </div>

      <div className="interp-block">
        <h4>WE</h4>
        <p>{interpretation.we}</p>
      </div>

      <div className="session-text">
        <p>{interpretation.sessionText}</p>
      </div>
    </div>
  );
}
