// Project files
import type Application from "../types/Application";
import businessFormConfig from "./businessFormConfig";

const initialApplication: Application = {
  // Step 1: Hero
  loan_amount: businessFormConfig.DEFAULT_AMOUNT,
  loan_period: businessFormConfig.DEFAULT_PERIOD,

  // Step 2: Personal info
  email: "",
  phone: "",

  // BankID login
  ssn: "",

  // Step 3: Choose company
  company_org_number: "",

  // Step 4: Turnover
  has_existing_loans: undefined,
  loan_debt: 0,
  turnover: 0,

  // Step 5: Loan details
  purpose: "",

  // Step 6: Guarantor (AB)
  is_guarantor: true,

  // Step 6: Existing loans (EN)
  blanco_loans: 0,
  house_loans: 0,
  installment_loans: 0,
};

export default initialApplication;
