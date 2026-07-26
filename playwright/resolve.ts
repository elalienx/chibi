// Project files
const stories = import.meta.glob("../src/**/*.story.tsx");
const id = (file: string) => file.replace(/^(\.\.\/)+src\//, "").replace(/\.story\.\w+$/, "");

/**
 * About:
 * Maps a story id (e.g. "components/Button/Primary") to its component export,
 * resolved from the globbed `*.story.tsx` files. Used by the gallery's
 * `window.mount` to render the requested story into `#root`.
 */
export default async function resolve(story: string) {
  const sep = story.lastIndexOf("/");
  const path = story.slice(0, sep);
  const name = story.slice(sep + 1);
  const file = Object.keys(stories).find((f) => id(f) === path || id(f).endsWith("/" + path));
  const mod = (file && (await stories[file]())) as Record<string, unknown> | undefined;

  return (mod?.[name] ?? mod?.default) as React.ComponentType<any> | undefined;
}
