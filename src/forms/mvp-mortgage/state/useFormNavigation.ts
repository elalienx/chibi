// Node modules
import { create, type StateCreator } from "zustand";

// Project files
import { type Step } from "../types/Step";
import goPreviousStep from "./helpers/goPreviousStep";
import setStep from "./helpers/setStep";

interface Store {
  /** The step in the form we are currently in. */
  step: Step;

  /** A list of previously navigated steps. Used to automatically go back when pressing the back button. */
  previousSteps: Step[];

  /** Method to manually set what is the next step to show on the form. */
  setStep: (newStep: Step) => void;

  /** Method to automatically return to the previous step without needing to specify it. */
  goPreviousStep: () => void;

  /** Method to return to the first step and clear the navigation history. */
  resetNavigation: () => void;
}

const initialState = {
  step: "intro-step" as Step,
  previousSteps: [] as Step[],
};

const store: StateCreator<Store> = (set) => ({
  ...initialState,
  setStep: (newStep) => set((state) => setStep(state.step, state.previousSteps, newStep)),
  goPreviousStep: () => set((state) => goPreviousStep(state.step, state.previousSteps)),
  resetNavigation: () => set(initialState),
});

/**
 * Use to navigate forward and backward on a long multi-step form.
 */
const useFormNavigation = create<Store>()(store);

export default useFormNavigation;
