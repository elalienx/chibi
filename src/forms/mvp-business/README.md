# MVP Business

This folder simulates a business loan application. A company representative picks a loan, logs in with BankID, chooses which company is applying, and describes its finances.

## Folder structure

```text
/ mvp-business/
├── data/
├── state/
│   └── useApplication.ts (⭐️ Key file)
│   └── useFormNavigation.ts (⭐️ Key file)
├── steps/
├── types/
└── FormManager.tsx (🏁 Entry point)
```

Here is an explanation of the main folders:

1. **📑 Data:** The loan limits in `businessFormConfig.ts`, the select options, and the initial empty application.
1. **💾 State:** Global Zustand stores for the user's application responses and the navigation.
1. **📝 Form steps:** One folder per step. Each folder contains a React TypeScript file and a Storybook file. Steps with inputs also have a Valibot schema, and most have a CSS file.
1. **🏷️ Types:** The TypeScript types shared across steps.

Here is an explanation of the key files:

1. **[useApplication](./state/useApplication.ts):** Saves the user's application responses. It persists to localStorage under the key "business-application". It discards old saved data automatically when its version is bumped, which you must do by hand every time the [Application](./types/Application.ts) type changes.
1. **[useFormNavigation](./state/useFormNavigation.ts):** Saves the current step and a history of previous steps. The back arrow uses that history, so steps don't need to know where they came from.
1. **[FormManager](./FormManager.tsx):** Imports every step and toggles which one is visible, based on the current step in useFormNavigation.

## Flow variants

After Step 2, we authenticate the user with BankID. Then we collect their company information and change the flow depending on the company type:

- **🏙️ AB Multiple companies:** shows Steps 3 (Choose company), 4, 5, and 6 AB (Guarantor).
- **🏢 AB Single company:** skips Step 3 because it only has one company, then shows Steps 4, 5, and 6 AB (Guarantor).
- **🧑‍💼 Sole trader:** skips Step 3 because there is no company to choose, then shows Steps 4, 5, and 6 EN (Existing loans).

## Things to watch out

Fields that get hidden or skipped keep their old value in the application, so the `submitForm` method resets them before saving:

- **🪪 BankID login:** resets the company for sole traders.
- **📝 Step 4:** resets the loan debt when the company has no existing loans.

## See it in action

- Run `pn storybook` from the project root.
- Open **MVP Business** to see each step.
