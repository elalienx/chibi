# Chibi

Chibi is a UI component library for building complex multi-step forms.

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

1. **📦 Components:** The UI components of Chibi. Each folder contains a React TypeScript file, a Storybook file, and at least one CSS file. If the folder contains more than one CSS file, the name explains how the component styles are divided into layout, state, design, or any unique case scenarios.
1. **📋 Forms:** Split into `example-` folders showing component behavior and `mvp-` folders simulating a complex loan application forms.
1. **🧑‍💻 Helpers:** Scripts designed to smooth the integration between Chibi UI with Formisch and Valibot.
1. **📑 Pages:** Astro pages for accessing the examples of forms in action.

## Terminal commands

All commands are run from the root of the project:

| Command                              | Action                                                |
| :----------------------------------- | :---------------------------------------------------- |
| `pn install`                         | Installs dependencies                                 |
| `pn dev`                             | Starts local dev server at `localhost:4321`           |
| `pn format`                          | Format all files using Oxfmt                          |
| `pn lint`                            | Lint all files using Oxlint                           |
| `pn playwright --ui`                 | Run component tests using Playwright UI mode          |
| `pn storybook`                       | Preview components using Storybook                    |
| `pn test`                            | Run unit tests using Vitest                           |
| `pn update --include-github-actions` | Update project dependencies and GitHub Action plugins |
