// Project files
import type { PropertyType } from "./PropertyType";
import type { TenancyType } from "./TenancyType";

/** All the information gathered during the Mortgage application form. */
export default interface Application {
  // Step 2: About the property
  monthly_fee: number /** Dynamic field depending on property_type and tenancy_agreement. */;
  operating_cost: number /** Dynamic field depending on property_type and tenancy_agreement. */;
  property_type: PropertyType;
  rooms: number;
  size: number;
  tenancy_type: TenancyType;

  // Step 3: Main applicant personal info
  has_co_applicant: boolean | undefined /** Undefined until answered. Decides if steps 4 and 6 are shown. */;

  // Step 4: Co-applicant personal info
  co_civil_state: string;
  co_claims_pep: boolean;
  co_email: string;
  co_employment_type: string;
  co_phone: string;
  co_relationship_with_main_applicant: string;
  co_ssn: string;

  // Steps 3 and 5: Main applicant
  main: {
    // Step 3: Personal info
    civil_state: string;
    claims_pep: boolean;
    email: string;
    employment_type: string;
    phone: string;

    // Step 5: Employment
    employment_company_name: string;
    employment_income_in_foreign_currency: boolean | undefined /** Undefined until answered. */;
    employment_monthly_income: number;
    employment_monthly_pension: number;
    employment_profession: string;
    employment_since_month: number;
    employment_since_year: number;
    employment_to_month: number /** Dynamic field depending on employment_type. */;
    employment_to_year: number /** Dynamic field depending on employment_type. */;
  };

  // Step 6: Co-applicant employment
  co_employment_company_name: string;
  co_employment_income_in_foreign_currency: boolean | undefined /** Undefined until answered. */;
  co_employment_monthly_income: number;
  co_employment_monthly_pension: number;
  co_employment_profession: string;
  co_employment_since_month: number;
  co_employment_since_year: number;
  co_employment_to_month: number /** Dynamic field depending on co_employment_type. */;
  co_employment_to_year: number /** Dynamic field depending on co_employment_type. */;
}
