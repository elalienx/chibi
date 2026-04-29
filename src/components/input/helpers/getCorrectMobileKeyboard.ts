/**
 * About
 * Apple requires an additional property "inputMode" inside <input/> to show the correct keyboard.
 * This method extraxts this functionality so the Input.tsx stays clean and neutral.
 */
export default function getCorrectMobileKeyboard(type: string) {
  if (type === "number") return "numeric";
  if (type === "email") return "email";
  if (type === "tel") return "tel";

  return "text";
}
