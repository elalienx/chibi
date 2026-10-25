// Node modules
import { StrictMode } from "react";
import { flushSync } from "react-dom";
import { createRoot, type Root } from "react-dom/client";

// Project files
import resolveStory from "./resolveStory";
import type MountParams from "./MountParams";
import "styles/style.css";

// Properties
const rootElement = document.getElementById("root")!;
let root: Root | undefined;

/**
 * About:
 * Renders the requested story into `#root`. Called by Playwright's `mount` fixture.
 * Reuses the root so update() reconciles and preserves component state.
 * Uses flushSync so a render error rejects the promise instead of being swallowed.
 */
async function mount({ story, props }: MountParams) {
  const Story = await resolveStory(story);

  // Safeguards
  if (!Story) throw new Error(`Unknown story: ${story}`);

  root ??= createRoot(rootElement);
  flushSync(() =>
    root!.render(
      <StrictMode>
        <Story {...props} />
      </StrictMode>,
    ),
  );
}

/**
 * Removes the mounted story so the next test starts with a fresh root.
 */
async function unmount() {
  root?.unmount();
  root = undefined;
}

Object.assign(window, { mount, unmount });
