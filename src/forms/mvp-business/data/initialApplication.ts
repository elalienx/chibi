// Project files
import type Application from "../types/Application";
import businessFormConfig from "./businessFormConfig";

const initialApplication: Application = {
  blanco_loans: 0,
  company_org_number: "",
  email: "",
  has_existing_loans: undefined,
  house_loans: 0,
  installment_loans: 0,
  is_guarantor: true,
  loan_amount: businessFormConfig.DEFAULT_AMOUNT,
  loan_debt: 0,
  loan_period: businessFormConfig.DEFAULT_PERIOD,
  phone: "",
  purpose: "",
  ssn: "",
  turnover: 0,
};

export default initialApplication;
