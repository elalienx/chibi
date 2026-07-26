// Project files
const stories = import.meta.glob("../src/**/*.story.tsx");
const id = (file: string) => file.replace(/^(\.\.\/)+src\//, "").replace(/\.story\.\w+$/, "");

/**
 * About:
 * The Playwright component-testing gallery. It exposes `window.mount` /
 * `window.unmount` (see the skill's gallery-spec) so the built-in `mount`
 * fixture can render any story into `#root`.
 */
export default async function resolve(storyId: string) {
  const sep = storyId.lastIndexOf("/");
  const path = storyId.slice(0, sep);
  const name = storyId.slice(sep + 1);
  const file = Object.keys(stories).find((f) => id(f) === path || id(f).endsWith("/" + path));
  const mod = (file && (await stories[file]())) as Record<string, unknown> | undefined;

  return (mod?.[name] ?? mod?.default) as React.ComponentType<any> | undefined;
}
