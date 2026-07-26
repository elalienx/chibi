// Node modules
import { StrictMode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

// Project files
import resolve from "./resolve";
import "styles/style.css";

interface MountParams {
  story: string;
  props?: Record<string, unknown>;
}

// Properties
const rootEl = document.getElementById("root")!;
let root: Root | undefined;

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
