// Project files
import type Application from "../types/Application";
import businessFormConfig from "./businessFormConfig";

const initialApplication: Application = {
  company_org_number: "",
  email: "",
  has_existing_loans: undefined,
  is_guarantor: false,
  loan_amount: businessFormConfig.DEFAULT_AMOUNT,
  loan_debt: 0,
  loan_period: businessFormConfig.DEFAULT_PERIOD,
  phone: "",
  purpose: "",
  turnover: 0,
};

export default initialApplication;
