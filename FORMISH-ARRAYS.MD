# Formisch arrays

## Table of contents

1. [Sub-form variants](#sub-form-variants)
1. [Components](#components)
1. [Tests](#tests)

## Sub-form variants

1. **[One open](src/forms/example-sub-form-one-open/FormPage.tsx):** Only one sub-form is open at a time. Saving validates the employee, stores it in the page, and shows it as a card with Edit and Delete buttons.

1. **[All open](src/forms/example-sub-form-all-open/FormPage.tsx):** Every employee is a sub-form that stays open. The values live inside each sub-form, and the page validates all of them before adding an employee or submitting.

## Components

| # | Component | Description | Direct prop or passed by |
|---|-----------|-------------|--------------------------|
| 1 | `InputField` | Field wrapper that links a Formisch field to its label and input | Direct |
| 2 | `ChipGroup` | Single-choice chip group field (job role) | Direct |
| 3 | `Label` | Label for a field or group | Passed by `InputField` or `ChipGroup` |
| 4 | `Input` | Text input (company name, employee name) | Passed by `InputField` |
| 5 | `ChipOption` | One chip inside `ChipGroup` | Passed by `ChipGroup` |

## Tests

**One open** ([SubFormOneOpen.spec.ts](playwright/components/SubFormOneOpen.spec.ts))

1. Should open the sub-form and disable the parent submit button
1. Should close the sub-form without saving when clicking cancel
1. Should show errors when saving an empty sub-form
1. Should not validate the parent form when saving the sub-form
1. Should show a card with the employee name after saving
1. Should edit a saved employee
1. Should delete a saved employee
1. Should submit the parent form with the saved employees

**All open** ([SubFormAllOpen.spec.ts](playwright/components/SubFormAllOpen.spec.ts))

1. Should start without sub-forms and open one when clicking add
1. Should show errors and not add a sub-form when the current one is empty
1. Should add a sub-form when the previous one is valid
1. Should validate every sub-form, not only the last one
1. Should not validate the parent form when adding a sub-form
1. Should delete a sub-form and keep the inputs of the others
1. Should not submit when a sub-form is invalid
1. Should submit the parent form with the employees
