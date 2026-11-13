# MVP Mortgage

This folder simulates a mortgage application. The applicant describes the property, applies alone or with a co-applicant, and shares their employment and household.

## Folder structure

```text
/ mvp-mortgage/
├── data/
├── state/
│   └── useApplication.ts (⭐️ Key file)
│   └── useFormNavigation.ts (⭐️ Key file)
├── steps/
├── types/
└── FormManager.tsx (🏁 Entry point)
```

Here is an explanation of the main folders:

1. **📑 Data:** The select options, like the property and employment types, and the initial empty application.
1. **💾 State:** Global Zustand stores for the user's application responses and the navigation.
1. **📝 Form steps:** One folder per step. Each folder contains a React TypeScript file and, except for the intro step, a Storybook file. Steps with inputs also have a Valibot schema, and most have a CSS file.
1. **🏷️ Types:** The TypeScript types shared across steps, like `Application` and `Step`.

Here is an explanation of the key files:

1. **[useApplication](./state/useApplication.ts):** Saves the user's application responses. It persists to localStorage under the key "mortgage-application". It discards old saved data automatically when its version is bumped, which you must do by hand every time the [Application](./types/Application.ts) type changes.
1. **[useFormNavigation](./state/useFormNavigation.ts):** Saves the current step and a history of previous steps. The back arrow uses that history, so steps don't need to know where they came from.
1. **[FormManager](./FormManager.tsx):** Imports every step and toggles which one is visible, based on the current step in useFormNavigation. It also reads useApplication to pass the property and employment types to the steps that need them.

## Flow variants

- **Step 2:** changes its fields depending on the property type selected in Step 1.
- **Step 3:** the applicant chooses whether to apply with a co-applicant, which changes the flow:
  - **👤 Single applicant:** skips Steps 4 (Co-applicant info) and 6 (Co-applicant employment).
  - **👥 With co-applicant:** shows all steps.
- **Steps 5 and 6:** change their fields depending on the employment type selected in Steps 3 and 4. Read the [Step 5 README](./steps/step-5/README.md) for details.

## Things to watch out

Fields that get hidden or skipped keep their old value in the application, so the `submitForm` method resets them before saving:

- **📝 Step 2:** resets the monthly fee and operating cost, so only the visible one is saved.
- **📝 Step 3:** resets the co-applicant data when there is no co-applicant.
- **📝 Steps 5 and 6:** reset the employment fields hidden by the employment type.

## See it in action

- Run `pn storybook` from the project root.
- Open **MVP Mortgage** to see each step.
