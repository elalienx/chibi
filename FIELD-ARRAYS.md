# Field arrays

Proposal to let Chibi components handle lists of repeated fields, like "add an employee".

## The problem

The real website has two patterns for lists:

| Pattern        | How it works                                                                                               | Example                       |
| :------------- | :--------------------------------------------------------------------------------------------------------- | :---------------------------- |
| 💾 Save/Cancel | One item is edited at a time in a sub-form, then saved as a card.                                          | `src/forms/example-sub-form/` |
| 📂 Always open | Every item shows its fields at the same time, like the Formisch [field arrays docs](https://formisch.dev). | Not yet in Chibi              |

Save/Cancel already works: the sub-form has its own `useForm`, so its fields are top-level and Chibi components can use them as they are.

Always open does not work yet. Every field component finds its field with `useField(form, { path: [id] })`, so it can only reach top-level fields. A field inside a list needs a nested path like `["employees", 0, "employee_name"]`.

## The proposal

Add an optional `path` prop with the location of the field's parent object. The component adds the `id` at the end to build the full path and the HTML id.

```tsx
// Top-level field, works the same as today
<InputField form={form} id="company_name">

// Field inside a list
<InputField form={form} id="employee_name" path={["employees", index]}>
```

Inside the component:

```tsx
interface Props {
  /** Field name inside its object. Also the key for tooltips. */
  id: string;

  /** Where the field's object lives, for fields inside arrays. Example: ["employees", 0] */
  path?: (string | number)[];
}

const { fullPath, fullId } = getFieldPath({ id, path });
// fullPath = ["employees", 0, "employee_name"]
// fullId   = "employees_0_employee_name", or just "employee_name" without path

const field = useField(form, { path: fullPath });
```

Forms without `path` keep the same HTML ids, so existing forms need no changes.

### Shared helper

`InputField` passes the `id` to both `Label` and `Input`. If each one builds the id on its own they can drift apart, so all components use one helper in `src/helpers/`:

```ts
export default function getFieldPath({ id, path }: Props) {
  const fullPath = path ? [...path, id] : [id];

  return { fullPath, fullId: fullPath.join("_") };
}
```

### Why the HTML id must include the path

In the Always open pattern every row is on screen at once. Three rows with `id="employee_name"` break the rule that HTML ids are unique:

- The `htmlFor` of each label points to the first row, so clicking a label in row 3 focuses row 1.
- The `aria-describedby` of each error points to the first row, so screen readers read the wrong error.

Adding the path makes every id unique.

### Tooltips

Tooltips keep using the plain `id` (`tooltips?.[id]`), not `fullId`. One tooltip entry for `employee_name` then works for every row.

## Components to update

These 8 components call `useField(form, { path: [id] })`:

- `InputText`
- `InputNumber`
- `Checkbox`
- `Slider`
- `ChipGroup`
- `ToggleGroup`
- `SelectGroup`
- `RadioGroup`

Plus the wrappers that pass the `id` down: `InputField` and `Label`.

## Plan

1. Add the `getFieldPath` helper with unit tests.
1. Add the optional `path` prop to the components above.
1. Keep `example-sub-form` as the reference for Save/Cancel.
1. Add `example-field-array` as the reference for Always open, using `useFieldArray` and Chibi components, with its own Playwright spec.

## Open question

`path` only holds the parent part of the path. Would `parentPath` be clearer to someone reading `path={["employees", index]}` for the first time?
