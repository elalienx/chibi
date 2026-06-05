// Project files
import type Application from "../types/Application";

const initialApplication: Application = {
  loan_amount: 0,
  loan_period: 0,
  email: "",
  phone: "",
  company_org_number: "",
  loan_purpose: undefined,
  last_year_turnover: 0,
  has_existing_loans: false,
  loan_debt: 0,
  is_guarantor: false,
};

export default initialApplication;
