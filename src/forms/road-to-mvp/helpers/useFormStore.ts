// Node modules
import { create } from "zustand";

// Project files
import { loandApplication } from "./constants";
import type LoanApplicationStore from "../types/LoanApplication";

interface Store {
  /** The entire form information. */
  loanApplication: LoanApplicationStore;

  /** Method to reset form. */
  clearLoanApplication: () => void;

  /** Method to update form values. */
  updateLoanApplication: (updates: Partial<LoanApplicationStore>) => void;
}

const useLoanApplication = create<Store>((set) => ({
  loanApplication: loandApplication,
  clearLoanApplication: () => set({ loanApplication: loandApplication }),
  updateLoanApplication: (updates) => set((state) => ({ loanApplication: { ...state.loanApplication, ...updates } })),
}));

export default useLoanApplication;
