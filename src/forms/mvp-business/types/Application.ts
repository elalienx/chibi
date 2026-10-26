/** All the information gathered during the Business application form. */
export default interface Application {
  blanco_loans: number;
  company_org_number: string;
  email: string;
  has_existing_loans: boolean | undefined;
  house_loans: number;
  installment_loans: number;
  is_guarantor: boolean;
  loan_amount: number;
  loan_debt: number;
  loan_period: number;
  loan_purpose_details?: string;
  phone: string;
  purpose: string;
  turnover: number;
}
