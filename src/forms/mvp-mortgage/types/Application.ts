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

  // Step 4: Co-applicant personal info
  co_civil_state: string;
  co_claims_pep: boolean;
  co_email: string;
  co_employment_type: string;
  co_phone: string;
  co_relationship_with_main_applicant: string;
  co_ssn: string;

  // Step 5: Main applicant employment
  main_employment_company_name: string;
  main_employment_income_in_foreign_currency: boolean | undefined /** Undefined until answered. */;
  main_employment_monthly_income: number;
  main_employment_monthly_pension: number;
  main_employment_profession: string;
  main_employment_since_month: number;
  main_employment_since_year: number;
  main_employment_to_month: number /** Dynamic field depending on main_employment_type. */;
  main_employment_to_year: number /** Dynamic field depending on main_employment_type. */;

  // Step 6: Co-applicant employment
  co_employment_company_name: string;
  co_employment_income_in_foreign_currency: boolean | undefined /** Undefined until answered. */;
  co_employment_monthly_income: number;
  co_employment_profession: string;
  co_employment_since_month: number;
  co_employment_since_year: number;
  co_employment_to_month: number /** Optional until the employment type variations are defined. */;
  co_employment_to_year: number /** Optional until the employment type variations are defined. */;
}
