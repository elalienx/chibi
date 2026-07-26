// Node modules
import { StrictMode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

// Project files
import "styles/style.css";

/**
 * About:
 * The Playwright component-testing gallery. It exposes `window.mount` /
 * `window.unmount` (see the skill's gallery-spec) so the built-in `mount`
 * fixture can render any story into `#root`.
 */
const stories = import.meta.glob("../src/**/*.story.tsx");
const id = (file: string) => file.replace(/^(\.\.\/)+src\//, "").replace(/\.story\.\w+$/, "");

async function resolve(storyId: string) {
  const sep = storyId.lastIndexOf("/");
  const path = storyId.slice(0, sep);
  const name = storyId.slice(sep + 1);

  const file = Object.keys(stories).find((f) => id(f) === path || id(f).endsWith("/" + path));
  const mod = (file && (await stories[file]())) as Record<string, unknown> | undefined;

  return (mod?.[name] ?? mod?.default) as React.ComponentType<any> | undefined;
}

const rootEl = document.getElementById("root")!;
let root: Root | undefined;

interface MountParams {
  story: string;
  props?: Record<string, unknown>;
}

(window as any).mount = async ({ story, props }: MountParams) => {
  const Story = await resolve(story);
  if (!Story) throw new Error(`Unknown story: ${story}`);

  // Reuse the root so update() reconciles and preserves component state.
  root ??= createRoot(rootEl);
  // flushSync so a render error rejects the promise instead of being swallowed.
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
