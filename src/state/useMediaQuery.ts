// Node modules
import { useSyncExternalStore } from "react";

/**
 * Returns true while the media query matches, updating live on change.
 */
export default function useMediaQuery(query: string) {
  function subscribe(callback: () => void) {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  }

  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches);
}
