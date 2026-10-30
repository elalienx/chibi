/** All the information gathered during the Business application form. */
export default interface Application {
  // Step 1: Hero
  loan_amount: number;
  loan_period: number;

  // Step 2: Personal info
  email: string;
  phone: string;

  // BankID login
  ssn: string;

  // Step 3: Choose company
  company_org_number: string;

  // Step 4: Turnover
  has_existing_loans: boolean | undefined;
  loan_debt: number;
  turnover: number;

  // Step 5: Loan details
  loan_purpose_details?: string;
  purpose: string;

  // Step 6: Guarantor (AB)
  is_guarantor: boolean;

  // Step 6: Existing loans (EN)
  blanco_loans: number;
  house_loans: number;
  installment_loans: number;
}
