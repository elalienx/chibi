// Node modules
import { StrictMode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

// Project files
import "styles/style.css";

interface MountParams {
  story: string;
  props?: Record<string, unknown>;
}

// Properties
const stories = import.meta.glob("../src/**/*.story.tsx");
const id = (file: string) => file.replace(/^(\.\.\/)+src\//, "").replace(/\.story\.\w+$/, "");
const rootEl = document.getElementById("root")!;
let root: Root | undefined;

/**
 * About:
 * The Playwright component-testing gallery. It exposes `window.mount` /
 * `window.unmount` (see the skill's gallery-spec) so the built-in `mount`
 * fixture can render any story into `#root`.
 */
async function resolve(storyId: string) {
  const sep = storyId.lastIndexOf("/");
  const path = storyId.slice(0, sep);
  const name = storyId.slice(sep + 1);
  const file = Object.keys(stories).find((f) => id(f) === path || id(f).endsWith("/" + path));
  const mod = (file && (await stories[file]())) as Record<string, unknown> | undefined;

  return (mod?.[name] ?? mod?.default) as React.ComponentType<any> | undefined;
}

/**
 * About:
 * Reuse the root so update() reconciles and preserves component state.
 * flushSync so a render error rejects the promise instead of being swallowed.
 */
(window as any).mount = async ({ story, props }: MountParams) => {
  const Story = await resolve(story);

  // Safeguards
  if (!Story) throw new Error(`Unknown story: ${story}`);

  root ??= createRoot(rootEl);

  flushSync(() =>
    root!.render(
      <StrictMode>
        <Story {...props} />
      </StrictMode>,
    ),
  );
};

(window as any).unmount = async () => {
  root?.unmount();
  root = undefined;
};
