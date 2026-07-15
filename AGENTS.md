# Aphrodite Chibi skills

This repository contains Agent Skills for Formisch and Valibot which are the core of Aphrdoite Chibi formulary system.

## Available Skills

- **formisch** — Form handling with Formisch
- **valibot** — Schema validation with Valibot

## How to Use

When working on any task, start by reading the section "Project Structure" in the README.md located at the project root. It will give context about the key folder locations.

When working on tasks involving form handling consult the relevant form library skills in the `skills/` directory. Each skill contains a `SKILL.md` with detailed instructions.

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
