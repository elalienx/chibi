// Node modules
import { useSyncExternalStore } from "react";

/**
 * Returns true while the media query matches, updating live on change.
 */
export default function useMediaQuery(query: string) {
  // Properties
  const getSnapshot = () => window.matchMedia(query).matches;
  const getServerSnapshot = () => false;
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);

    media.addEventListener("change", callback);

    return () => media.removeEventListener("change", callback);
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
