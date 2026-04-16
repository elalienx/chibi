// Node modules
import { create } from "zustand";

// Project files
import initialApplication from "../data/initialApplication";
import type Application from "../types/Application";

interface Store {
  /** The information of the entire mortgage loan application. */
  application: Application;

  /** Method to reset the loan application. */
  clearApplication: () => void;

  /** Method to update loan application values. */
  updateApplication: (updates: Partial<Application>) => void;
}

/** A Zustand store for the mortgage loan application and its available methods. */
const useApplication = create<Store>((set) => ({
  application: initialApplication,
  clearApplication: () => set({ application: initialApplication }),
  updateApplication: (updates) => set((state) => ({ application: { ...state.application, ...updates } })),
}));

export default useApplication;
