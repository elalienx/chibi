---
name: css-writing-rules
description: CSS property order for Aphrodite Chibi. Use when writing, reviewing or reordering any CSS file in the project — every rule lists its properties in the same 10 groups.
---

# CSS Writing Rules

Inside every CSS rule, write properties in the same 10 groups. Anyone opening a file then knows where to look for a property without reading the whole rule.

## The 10 Groups

| #   | Group             | Properties, in order                                                                                                                  |
| --- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Custom properties | `--*`, followed by a blank line                                                                                                       |
| 2   | Positioning       | `position`, `inset`, `top`, `right`, `bottom`, `left`, `z-index`                                                                      |
| 3   | Layout            | `display`, `flex-direction`, `flex-wrap`, `grid-template-*`, `grid-area`, alignment (`align-*`, `justify-*`, `place-*`), `gap`, `overflow` |
| 4   | Size              | `width`, `height` (with `min-*` and `max-*` next to them)                                                                             |
| 5   | Spacing           | `margin`, `padding`                                                                                                                   |
| 6   | Background design | `background`, `border`, `border-radius`, `box-shadow`                                                                                 |
| 7   | Foreground design | `color`                                                                                                                               |
| 8   | Typography        | `font-family`, `font-size`, `font-weight`, `line-height`, `text-align`, `text-decoration`, `text-wrap`, `text-shadow`, `vertical-align`, `letter-spacing` |
| 9   | Interaction       | `outline`, `cursor`, `pointer-events`                                                                                                 |
| 10  | Animation         | `transform`, `rotate`, `translate`, `transition`                                                                                      |

In `input` resets, `appearance: none` comes first.

## Typography Order

Sort typography properties by **visual impact**: how different the text would look if the property failed or was missing. Highest impact goes first.

| Impact | Meaning                                         | Example                                                                 |
| ------ | ----------------------------------------------- | ----------------------------------------------------------------------- |
| High   | The text looks like a different design.         | `font-family`: a paid serif font that doesn't load falls back to a sans-serif. |
| Medium | Noticeable, but the text keeps its shape.       | `font-weight`: black (900) rendered as bold (700).                      |
| Low    | Only a careful designer would notice.           | `letter-spacing`: 0.16px.                                               |

To place a typography property that isn't in the table yet, decide its impact level, then put it next to the properties with a similar impact.

## Example

```css
.toggle-option {
  --border-width: 1px;

  position: relative;
  display: flex;
  align-items: center;
  gap: var(--space-base);
  height: var(--height-of-field);
  padding-inline: var(--space-medium);
  background-color: white;
  border: solid var(--border-width) var(--input-border-up);
  border-radius: var(--border-radius);
  color: var(--color-green-30);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: background-color 0.15s ease-in;
}
```

## When Reordering Existing CSS

- Move declarations only. Don't change any values, selectors or comments; a comment stays with its line.
- Reorder only within one rule. Never move a declaration across a nested block (`&:hover { … }`, `.icon { … }`).
- Keep a shorthand before its longhands, such as `border` before `border-right` and `inset` before `top`. Keep intentional duplicates in their order, such as a fallback `flex-wrap: wrap` before `flex-wrap: wrap balance`.
- Run `npx playwright test` afterwards. The screenshot comparisons, which run locally only, confirm there are no visual changes.
