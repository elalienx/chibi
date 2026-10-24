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
│   └── ci/ 🤖 Screenshots taken by the CI
│   └── local/ 💻 Screenshots taken on our computers
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
1. **📸 Snapshots:** The screenshots Playwright compares the component tests against, split into `local/` for our computers and `ci/` for the CI. See [Updating screenshots](#updating-screenshots) for how to update them.

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

## Updating screenshots

Playwright compares each component test against a saved screenshot. The screenshots are kept in two folders because the CI renders pixels slightly differently than our computers:

- `snapshots/local/`: compared when running Playwright on your computer.
- `snapshots/ci/`: compared by the CI on every pull request.

When a change is meant to alter how something looks, update both folders in the same pull request:

1. **Local:** run `pn playwright --update-snapshots` and commit the changed files in `snapshots/local/`.
1. **CI:** on GitHub, go to **Actions → Update CI screenshots → Run workflow** and pick your branch.
1. When the run finishes, download the `ci-screenshots` artifact from the bottom of the run page.
1. Unzip it into `snapshots/ci/`, replacing the old files, and commit them.

If the CI fails on screenshots you didn't mean to change, don't update them: the failure is a visual change that needs fixing.
