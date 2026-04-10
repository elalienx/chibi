// Node modules
import { create } from "zustand";

// Project files
import { initialLoanApplication } from "./constants";
import type LoanApplication from "../types/LoanApplication";

interface Store {
  /** The information of the entire mortgage loan application. */
  loanApplication: LoanApplication;

  /** Method to reset the loan application. */
  clearLoanApplication: () => void;

  /** Method to update loan application values. */
  updateLoanApplication: (updates: Partial<LoanApplication>) => void;
}

/** A Zustand store for the mortgage loan application and its available methods. */
const useLoanApplication = create<Store>((set) => ({
  loanApplication: initialLoanApplication,
  clearLoanApplication: () => set({ loanApplication: initialLoanApplication }),
  updateLoanApplication: (updates) => set((state) => ({ loanApplication: { ...state.loanApplication, ...updates } })),
}));

export default useLoanApplication;
