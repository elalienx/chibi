# Aphrodite Chibi

Aphrodite Chibi is a UI component library for building complex multi-step forms. Our motto is: Making Lendo more Kawaii <3

Demo: [aphrodite-chibi.web.app](https://aphrodite-chibi.web.app)

## Project Structure

Inside the Aphrodite Chibi project, you'll see the following folders and files:

```text
/ root/
├── playwright/
├── public/
├── snapshots/
├── src/
│   └── components/
│   └── forms/
│   └── helpers/
│   └── layout/
│   └── pages/index.astro 🏁 Entry point
│   └── styles/
└── package.json

```

Here is an explanation of the main folders:

1. **📦 Components:** The UI components of Aphrodite Chibi. Each folder contains a React TypeScript file and at least one CSS file. If the folder contains more than one CSS file, the name explains how the component styles are divided into layout, state, design, and any unique case scenarios.
1. **📋 Forms:** Special React components which simulate a specific Lendo application form. Use to test Aphrodite Chibi integrations with schema validation, form handlers, numeric formatting, state management, and tracking.
1. **🧑‍💻 Helpers:** Scripts designed to smooth the integration between Aphrodite Chibi UI with Formisch and Valibot.
1. **📐 Layouts:** Special Astro components use to build other pages.
1. **📑 Pages:** Astro pages for accessing examples of forms in action. As mentioned, `index.astro` is the entry point. 🏁

## Terminal commands

All commands are run from the root of the project:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `pnpm install`         | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm build`           | Build the site to `./dist/`                      |
| `pnpm format`          | Format all files using Void Zero Oxfmt formatter |
| `pnpm lint`            | Lint all files using Void Zero Oxlint linter     |
| `pnpm playwright --ui` | Open Playwright UI viewer to run tests           |
| `pnpm test`            | Run unit tests using Vitest                      |

## Files without TS check

Due to working alone, I do not have the time to make sure the TypeScript compiler is 100% happy. Until others join and can help me debug, I will list the files with Typescript lines dissabled:

| File           | Code line                                      | Notes                                                      |
| :------------- | :--------------------------------------------- | :--------------------------------------------------------- |
| Input.tsx      | `const field = useField(form, { path: [id] })` | May be removed by using `<Field/>` instead of `useField()` |
| RadioGroup.tsx | `const field = useField(form, { path: [id] })` | May be removed by using `<Field/>` instead of `useField()` |
