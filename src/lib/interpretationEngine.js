export function generateInterpretation({ trackMeta, playbackState }) {
  const { mood, energy, key } = trackMeta;
  const active = playbackState.isPlaying;

  const me =
    mood === "introspective"
      ? "You feel deeply but quietly. You process more than you broadcast."
      : "You move with visible energy that others feel immediately.";

  const us =
    energy < 0.5
      ? "There is connection without pressure. You share space more than you demand it."
      : "There is a strong pull between you and others.";

  const we =
    key === "minor"
      ? "You move differently than the environment. You bring coherence into noisy spaces."
      : "You amplify what is already present around you.";

  const sessionText = active
    ? "You’re not asking a question. You’re revealing a state. And the song matches it."
    : "The field is present, even when the sound is quiet.";

  return { me, us, we, sessionText };
}
