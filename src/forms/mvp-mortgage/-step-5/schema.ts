// Node modules
import type { FormSchema } from "@formisch/react";
import * as v from "valibot";

// Project files
import getEmploymentFields from "./helpers/getEmploymentFields";

// Fields
const main_employment_company_name = v.pipe(
  v.string("Ange din arbetsgivare för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange din arbetsgivare för att gå vidare."),
);

const main_employment_since_year = v.pipe(
  v.string("Ange året du började för att gå vidare."),
  v.nonEmpty("Ange året du började för att gå vidare."),
  v.toNumber("Ange året du började för att gå vidare."),
);

const main_employment_since_month = v.pipe(
  v.string("Ange månaden du började för att gå vidare."),
  v.nonEmpty("Ange månaden du började för att gå vidare."),
  v.toNumber("Ange månaden du började för att gå vidare."),
);

const main_employment_to_year = v.pipe(
  v.string("Ange året du slutar för att gå vidare."),
  v.nonEmpty("Ange året du slutar för att gå vidare."),
);

const main_employment_to_month = v.pipe(
  v.string("Ange månaden du slutar för att gå vidare."),
  v.nonEmpty("Ange månaden du slutar för att gå vidare."),
);

const main_employment_monthly_income = v.pipe(
  v.string("Ange din månadsinkomst för att gå vidare."),
  v.nonEmpty("Ange din månadsinkomst för att gå vidare."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(9_167, "Månadsinkomsten är för låg. Du kan som lägst ange 9 167 kr/mån."),
  v.maxValue(800_000, "Månadsinkomsten är för hög. Du kan som högst ange 800 000 kr/mån."),
);

const main_employment_monthly_pension = v.pipe(
  v.string("Ange din pension för att gå vidare."),
  v.nonEmpty("Ange din pension för att gå vidare."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(1, "Ange din pension för att gå vidare."),
  v.maxValue(800_000, "Pensionen är för hög. Du kan som högst ange 800 000 kr/mån."),
);

const main_employment_profession = v.pipe(
  v.string("Ange ditt yrke för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange ditt yrke för att gå vidare."),
);

const main_employment_income_in_foreign_currency = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."),
  v.transform((value) => value === String(true)),
);

export default function buildSchema(employmentType: string): FormSchema {
  const { hasEmployer, hasEndDate, hasPension, hasProfession } = getEmploymentFields(employmentType);
  const employer = {
    main_employment_company_name,
    main_employment_since_year,
    main_employment_since_month,
  };

  // Without an employer
  if (hasPension) {
    return v.object({
      main_employment_monthly_pension,
      main_employment_income_in_foreign_currency,
    });
  }

  if (!hasEmployer) {
    return v.object({
      main_employment_monthly_income,
      main_employment_income_in_foreign_currency,
    });
  }

  // With an employer
  if (hasEndDate) {
    return v.object({
      ...employer,
      main_employment_to_year,
      main_employment_to_month,
      main_employment_profession,
      main_employment_monthly_income,
      main_employment_income_in_foreign_currency,
    });
  }

  if (hasProfession) {
    return v.object({
      ...employer,
      main_employment_profession,
      main_employment_monthly_income,
      main_employment_income_in_foreign_currency,
    });
  }

  return v.object({
    ...employer,
    main_employment_monthly_income,
    main_employment_income_in_foreign_currency,
  });
}
