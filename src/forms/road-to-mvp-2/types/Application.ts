// Project files
import type { LoanPurpose } from "./LoanPurpose";

/** All the information gathered during the Business application form. */
export default interface Application {
  company_org_number: string;
  email: string;
  has_existing_loans: boolean;
  is_guarantor: boolean;
  last_year_turnover: number;
  loan_amount: number;
  loan_debt: number;
  loan_period: number;
  loan_purpose: LoanPurpose | undefined;
  phone: string;
}
