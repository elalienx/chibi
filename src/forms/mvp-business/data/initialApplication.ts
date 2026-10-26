// Project files
import type Application from "../types/Application";
import businessFormConfig from "./businessFormConfig";

const initialApplication: Application = {
  company_org_number: "",
  email: "",
  has_existing_loans: undefined,
  installment_credit_debt: 0,
  is_guarantor: true,
  loan_amount: businessFormConfig.DEFAULT_AMOUNT,
  loan_debt: 0,
  loan_period: businessFormConfig.DEFAULT_PERIOD,
  mortgage_debt: 0,
  phone: "",
  purpose: "",
  turnover: 0,
  unsecured_loan_debt: 0,
};

export default initialApplication;
