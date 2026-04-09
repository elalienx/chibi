// Node modules
import { create } from "zustand";

// Project files
import { initialLoanApplication } from "./constants";
import type LoanApplication from "../types/LoanApplication";

interface Store {
  /** The entire form information. */
  loanApplication: LoanApplication;

  /** Method to reset form. */
  clearLoanApplication: () => void;

  /** Method to update form values. */
  updateLoanApplication: (updates: Partial<LoanApplication>) => void;
}

const useLoanApplication = create<Store>((set) => ({
  loanApplication: initialLoanApplication,
  clearLoanApplication: () => set({ loanApplication: initialLoanApplication }),
  updateLoanApplication: (updates) => set((state) => ({ loanApplication: { ...state.loanApplication, ...updates } })),
}));

export default useLoanApplication;
