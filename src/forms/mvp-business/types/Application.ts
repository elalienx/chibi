/** All the information gathered during the Business application form. */
export default interface Application {
  company_org_number: string;
  email: string;
  has_existing_loans: boolean | undefined;
  installment_credit_debt: number;
  is_guarantor: boolean;
  loan_amount: number;
  loan_debt: number;
  loan_period: number;
  loan_purpose_details?: string;
  mortgage_debt: number;
  phone: string;
  purpose: string;
  turnover: number;
  unsecured_loan_debt: number;
}
