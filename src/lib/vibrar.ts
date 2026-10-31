export function vibrar(ms = 8) {
  try {
    if (typeof navigator === "undefined") return;
    if (navigator.userActivation && !navigator.userActivation.hasBeenActive) return;
    if (!navigator.vibrate) return;
    navigator.vibrate(ms);
  } catch {
    // alguns navegadores (ex.: iPhone) não têm navigator.vibrate ou podem recusar a chamada
  }
}
