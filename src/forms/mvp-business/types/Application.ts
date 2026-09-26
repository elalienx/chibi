// Project files
import type { Purpose } from "./Purpose";

/** All the information gathered during the Business application form. */
export default interface Application {
  company_org_number: string;
  email: string;
  has_existing_loans: boolean | undefined;
  is_guarantor: boolean;
  loan_amount: number;
  loan_debt: number;
  loan_period: number;
  phone: string;
  purpose: Purpose | undefined;
  turnover: number;
}
