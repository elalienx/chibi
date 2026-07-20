# Aphrodite Chibi

Aphrodite Chibi is a UI component library for building complex multi-step forms.

Our motto is... making Lendo more Kawaii <3

[Demo website](https://aphrodite-chibi.web.app) | [Storybook gallery](https://aphrodite-chibi-storybook.web.app)

## Project Structure

```text
/ root/
├── playwright/
├── public/
├── skills/
├── snapshots/
├── src/
│   └── components/
│   └── forms/
│   └── helpers/
│   └── layouts/
│   └── pages/index.astro 🏁 Entry point
│   └── state/
│   └── styles/
└── package.json

```

Here is an explanation of the main folders:

1. **📦 Components:** The UI components of Aphrodite Chibi. Each folder contains a React TypeScript file, a Storybook file, and at least one CSS file. If the folder contains more than one CSS file, the name explains how the component styles are divided into layout, state, design, or any unique case scenarios.
1. **📋 Forms:** Split into `example` folders showing component behavior and `mvp` folders simulating Lendo product forms tailored to each team's conventions.
1. **🧑‍💻 Helpers:** Scripts designed to smooth the integration between Aphrodite Chibi UI with Formisch and Valibot.
1. **📑 Pages:** Astro pages for accessing examples of forms in action. As mentioned, `index.astro` is the entry point. 🏁

## Terminal commands

All commands are run from the root of the project:

| Command                | Action                                      |
| :--------------------- | :------------------------------------------ |
| `pnpm install`         | Installs dependencies                       |
| `pnpm dev`             | Starts local dev server at `localhost:4321` |
| `pnpm build`           | Build the site to `./dist/`                 |
| `pnpm format`          | Format all files using Oxfmt formatter      |
| `pnpm lint`            | Lint all files using Oxlint linter          |
| `pnpm playwright --ui` | Open Playwright UI viewer to run tests      |
| `pnpm test`            | Run unit tests using Vitest                 |
