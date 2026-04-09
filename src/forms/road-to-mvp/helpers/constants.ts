// Project files
import type LoanApplication from "../types/LoanApplication";

export const initialLoanApplication: LoanApplication = {
  monthly_fee: 0,
  operating_cost: 0,
  property_type: undefined,
  rooms: 0,
  size: 0,
};

// Property types
export const apartment = "apartment";
export const holidayHome = "holiday_home";
export const terracedHouse = "terraced_house";
export const villa = "villa";
