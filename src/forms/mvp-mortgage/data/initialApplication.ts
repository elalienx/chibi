// Project files
import type Application from "../types/Application";

const initialApplication: Application = {
  // Step 2: About the property
  monthly_fee: 0,
  operating_cost: 0,
  property_type: undefined,
  rooms: 0,
  size: 0,
  tenancy_type: "ownership",

  // Step 3: Main applicant personal info
  has_co_applicant: undefined,
  main_civil_state: "",
  main_claims_pep: false,
  main_email: "",
  main_employment_type: "",
  main_phone: "",

  // Step 5: Main applicant employment
  main: {
    employment_company_name: "",
    employment_income_in_foreign_currency: undefined,
    employment_monthly_income: 0,
    employment_monthly_pension: 0,
    employment_profession: "",
    employment_since_month: 0,
    employment_since_year: 0,
    employment_to_month: 0,
    employment_to_year: 0,
  },

  // Steps 4 and 6: Co-applicant
  co: {
    // Step 4: Personal info
    civil_state: "",
    claims_pep: false,
    email: "",
    employment_type: "",
    phone: "",
    relationship_with_main_applicant: "",
    ssn: "",

    // Step 6: Employment
    employment_company_name: "",
    employment_income_in_foreign_currency: undefined,
    employment_monthly_income: 0,
    employment_monthly_pension: 0,
    employment_profession: "",
    employment_since_month: 0,
    employment_since_year: 0,
    employment_to_month: 0,
    employment_to_year: 0,
  },
};

export default initialApplication;
