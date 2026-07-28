// Project files
const stories = import.meta.glob("../src/**/*.story.tsx");
const id = (file: string) => file.replace(/^(\.\.\/)+src\//, "").replace(/\.story\.\w+$/, "");

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
  const file = Object.keys(stories).find((filePath) => id(filePath) === path || id(filePath).endsWith("/" + path));
  const module = (file && (await stories[file]())) as Record<string, unknown> | undefined;

  return (module?.[name] ?? module?.default) as React.ComponentType<any> | undefined;
}
