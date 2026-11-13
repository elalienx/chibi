# MVP Consumer

This folder simulates a consumer loan application. The applicant applies alone or with a co-applicant, then shares their personal info.

## Folder structure

```text
/ mvp-consumer/
├── components/
├── data/
├── state/
│   └── useApplication.ts (⭐️ Key file)
│   └── useFormNavigation.ts (⭐️ Key file)
├── steps/
├── types/
└── FormManager.tsx (🏁 Entry point)
```

Here is an explanation of the main folders:

1. **📦 Components:** Components shared across steps, like the consumer agency warning.
1. **📑 Data:** The select options and the initial empty application.
1. **💾 State:** Global Zustand stores for the user's application progress and the step navigation.
1. **📝 Form steps:** One folder per step. Each folder contains a React TypeScript file and, except for the intro step, a Storybook file. Steps with inputs also have a Valibot schema and a CSS file.
1. **🏷️ Types:** The TypeScript types shared across steps, like `Application` and `Step`.

Here is an explanation of the key files:

1. **[useApplication](./state/useApplication.ts):** Saves the user's application progress. It persists to localStorage under the key "consumer-application". It discards old saved data automatically when its version is bumped, which you must do by hand every time the [Application](./types/Application.ts) type changes.
1. **[useFormNavigation](./state/useFormNavigation.ts):** Saves the current step and a history of previous steps. The back arrow uses that history, so steps don't need to know where they came from.
1. **[FormManager](./FormManager.tsx):** Imports every step and toggles which one is visible, based on the current step in useFormNavigation. It also reads useApplication to tell Step 3 and the success step if there is a co-applicant.

## Flow variants

Steps 1, 4, and 5 aren't built yet, so the form goes from the intro to Steps 2, 3, and the success step. 

In Step 2, the applicant chooses whether to apply with a co-applicant:
- **👤 Single applicant:** Step 3 only shows the applicant's personal info.
- **👥 With co-applicant:** Step 3 also shows the co-applicant's personal info.

## Things to watch out

Fields that get hidden or skipped keep their old value in the application, so the `submitForm` method resets them before saving:

- **📝 Step 3:** resets the co-applicant data when there is no co-applicant.

## See it in action

- Run `pn storybook` from the project root.
- Open **MVP Consumer** to see each step.
