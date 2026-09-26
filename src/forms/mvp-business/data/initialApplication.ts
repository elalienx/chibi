// Project files
import type Application from "../types/Application";
import BusinessFormConfig from "./BusinessFormConfig";

const initialApplication: Application = {
  company_org_number: "",
  email: "",
  has_existing_loans: undefined,
  is_guarantor: false,
  loan_amount: BusinessFormConfig.DEFAULT_AMOUNT,
  loan_debt: 0,
  loan_period: BusinessFormConfig.DEFAULT_PERIOD,
  phone: "",
  turnover: 0,
};

export default initialApplication;
