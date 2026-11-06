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
  main_civil_state: string;
  main_claims_pep: boolean;
  main_email: string;
  main_employment_type: string;
  main_phone: string;

  // Step 5: Main applicant employment
  main: {
    employment_company_name: string;
    employment_income_in_foreign_currency: boolean | undefined /** Undefined until answered. */;
    employment_monthly_income: number;
    employment_monthly_pension: number;
    employment_profession: string;
    employment_since_month: number;
    employment_since_year: number;
    employment_to_month: number /** Dynamic field depending on main_employment_type. */;
    employment_to_year: number /** Dynamic field depending on main_employment_type. */;
  };

  // Steps 4 and 6: Co-applicant
  co: {
    // Step 4: Personal info
    civil_state: string;
    claims_pep: boolean;
    email: string;
    employment_type: string;
    phone: string;
    relationship_with_main_applicant: string;
    ssn: string;

    // Step 6: Employment
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
}
