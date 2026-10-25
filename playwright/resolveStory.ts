// Node modules
import type { ComponentType } from "react";

// Properties
const stories = import.meta.glob("../src/**/*.story.tsx");
const sourceDirectory: RegExp = /^(\.\.\/)+src\//;
const storyExtension: RegExp = /\.story\.\w+$/;
const getId = (file: string) => file.replace(sourceDirectory, "").replace(storyExtension, "");

/**
 * About:
 * Maps a story id (e.g. "components/Button/Primary") to its component export,
 * resolved from the globbed `*.story.tsx` files. Used by the gallery's
 * `window.mount` to render the requested story into `#root`.
 */
export default async function resolveStory(story: string) {
  const separator = story.lastIndexOf("/");
  const path = story.slice(0, separator);
  const name = story.slice(separator + 1);
  const file = Object.keys(stories).find((item) => getId(item) === path || getId(item).endsWith("/" + path));
  const module = (file && (await stories[file]())) as Record<string, unknown> | undefined;

  return (module?.[name] ?? module?.default) as ComponentType<Record<string, unknown>> | undefined;
}
