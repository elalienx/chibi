# Aphrodite Chibi skills

This file is a directory of Agent Skills for creating UI components and complex multi-step forms using the UI library Aphrodite Chibi.

## Available Skills

- **formisch** — Form handling with Formisch
- **modern-web-guidance** — Required best-practice guidance for frontend implementation tasks
- **react-useeffect** — Helps removing unnecessary useEffect hooks.
- **valibot** — Schema validation with Valibot

## How to Use

- When working on any task, start by reading the _Project Structure_ section inside the `README.md` file located at the project root. It will give context about the key folder locations.

- When creating UI components, consult the skills `modern-web-guidance` and `react-useeffect` to prevent the creation of unnecessary side effects.

- When working on tasks involving form handling consult the following files in this order and only move to the next item, if the previous did not provide a clear answer:
  1. Check the examples in `src/forms/example-*/`, they have the best practices for integrating Chibi components with Formisch and Valibot.
  1. Check the skills for Fomisch and Valibot in `skills/formisch/` and `skills/valibot/`.

## Skill Format

Each skill follows the [agentskills.io](https://agentskills.io) specification:

```
skill-name/
├── SKILL.md          # Required: instructions + metadata
├── scripts/          # Optional: executable code
├── references/       # Optional: documentation
└── assets/           # Optional: templates, resources
```

## Guidelines

1. **Check skill metadata** — The `description` field indicates when to use each skill
2. **Follow instructions** — Each skill contains step-by-step guidance
3. **Use examples** — Skills include code examples and patterns
4. **Reference documentation** — Skills link to official docs when needed
