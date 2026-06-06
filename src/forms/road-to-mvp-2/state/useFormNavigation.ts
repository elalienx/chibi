// Node modules
import { create, type StateCreator } from "zustand";

// Project files
import { type Step } from "../types/Step";

interface Store {
  /** The step in the form we are currently in. */
  step: Step;

  /** A list of previously navigated steps. Used to automatically go back when pressing the back button. */
  previousSteps: Step[];

  /** Method to manually set what is the next step to show on the formulary. */
  setStep: (newStep: Step) => void;

  /** Method to automatically return to the previous step without needing to specify it. */
  goPreviousStep: () => void;
}

const store: StateCreator<Store> = (set) => ({
  step: "step-1",
  previousSteps: [],
  setStep: (newStep) =>
    set((state) => ({
      previousSteps: [...state.previousSteps, state.step],
      step: newStep,
    })),
  goPreviousStep: () =>
    set((state) => {
      // Safeguard
      if (state.previousSteps.length === 0) {
        console.info("You cannot navigate backward anymore.");

        return state;
      }

      const stepIndex = state.previousSteps.length - 1;
      const previousStep = state.previousSteps[stepIndex];
      const newPreviousSteps = state.previousSteps.slice(0, -1);

      return { step: previousStep, previousSteps: newPreviousSteps };
    }),
});

/**
 * Use to navigate forward and backward on a long multi-step form.
 */
const useFormNavigation = create<Store>()(store);

export default useFormNavigation;
