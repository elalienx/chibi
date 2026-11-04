# Step 6: Co-applicant employment

Step 6 asks about the co-applicant's work situation. It mirrors [Step 5](../-step-5/README.md) on purpose, with its own copy of every file, so stakeholders can add or remove a field for one applicant without touching the other.

## What triggers the variants

The variant depends on the **employment type** chosen in Step 4 (the "Anställningsform" select). That answer is saved under the key `co_employment_type` and passed to Step 6 as the `employmentType` prop:

```tsx
// FormManager.tsx
const coEmploymentType = application.co_employment_type;

<Step6 employmentType={coEmploymentType} />;
```

From there, two files work together:

- [`helpers/getEmploymentFields.ts`](./helpers/getEmploymentFields.ts) decides which fields to show.
- [`schema.ts`](./schema.ts) builds a matching Valibot schema, so only the visible fields are validated.

## Variants

The 11 employment types in [`data/employmentTypes.ts`](../data/employmentTypes.ts) are grouped as 5 variants.

| Variant             | Employment types                                                       | Fields                                           |
| :------------------ | :--------------------------------------------------------------------- | :----------------------------------------------- |
| **Permanent**       | `permanent_employment`, `probationary_employment`, `hourly_employment` | Employer, since date, profession, income         |
| **Self-employment** | `self_employment`                                                      | Employer, since date, income                     |
| **Temporary**       | `temporary_employment`, `substitute_employment`                        | Employer, since and to dates, profession, income |
| **Retirement**      | `retirement`, `early_retirement`, `disability_retirement`              | Pension                                          |
| **Student**         | `student`, `no_employment`                                             | Income                                           |

## See them in action

Each variant has its own story. Run Storybook from the project root:

```sh
pn storybook
```

Then open **MVP Mortgage → Step 6: Co-applicant employment** to see all 5 variants side by side.
