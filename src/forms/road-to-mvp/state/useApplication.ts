// Node modules
import { create, type StateCreator } from "zustand";
import { persist, type PersistOptions } from "zustand/middleware";

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

const store: StateCreator<Store> = (set) => ({
  application: initialApplication,
  clearApplication: () => set({ application: initialApplication }),
  updateApplication: (updates) => set((state) => ({ application: { ...state.application, ...updates } })),
});

const persistOptions: PersistOptions<Store> = {
  name: "mortgage-application",
};

const useApplication = create<Store>()(persist(store, persistOptions));

export default useApplication;
