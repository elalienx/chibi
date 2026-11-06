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

  // Step 4: Co-applicant personal info
  co_civil_state: "",
  co_claims_pep: false,
  co_email: "",
  co_employment_type: "",
  co_phone: "",
  co_relationship_with_main_applicant: "",
  co_ssn: "",

  // Steps 3 and 5: Main applicant
  main: {
    // Step 3: Personal info
    civil_state: "",
    claims_pep: false,
    email: "",
    employment_type: "",
    phone: "",

    // Step 5: Employment
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

  // Step 6: Co-applicant employment
  co_employment_company_name: "",
  co_employment_income_in_foreign_currency: undefined,
  co_employment_monthly_income: 0,
  co_employment_monthly_pension: 0,
  co_employment_profession: "",
  co_employment_since_month: 0,
  co_employment_since_year: 0,
  co_employment_to_month: 0,
  co_employment_to_year: 0,
};

export default initialApplication;
