# Step 5: Employment

Step 5 asks about the applicant's work situation. People earn their income in different ways, so the questions change with the person's situation:

- a retiree has a pension instead of an employer
- a fixed-term employee has an end date
- a student has neither

## What triggers the variants

The variant depends on the **employment type** chosen in Step 3 (the "Anställningsform" select). That answer is saved under the key `main_employment_type` and passed to Step 5 as the `employmentType` prop:

```tsx
// FormManager.tsx
const employmentType = application.main_employment_type;

<Step5 employmentType={employmentType} />;
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

Then open **MVP Mortgage → Step 5: Employment** to see all 5 variants side by side.
