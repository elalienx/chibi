// Node modules
import { create } from "zustand";

// Project files
import { initialFormStore, type FormStore } from "./FormStore";

interface FormStoreState {
  /** The entire form information. */
  formStore: FormStore;

  /** Method to reset form. */
  clearFormStore: () => void;

  /** Method to update form values. */
  updateFormStore: (updates: Partial<FormStore>) => void;
}

const useFormStore = create<FormStoreState>((set) => ({
  formStore: initialFormStore,
  clearFormStore: () => set({ formStore: initialFormStore }),
  updateFormStore: (updates) => set((state) => ({ formStore: { ...state.formStore, ...updates } })),
}));

export default useFormStore;
