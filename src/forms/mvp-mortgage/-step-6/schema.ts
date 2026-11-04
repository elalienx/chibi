// Node modules
import type { FormSchema } from "@formisch/react";
import * as v from "valibot";

// Project files
import getEmploymentFields from "./helpers/getEmploymentFields";

// Fields
const co_employment_company_name = v.pipe(
  v.string("Ange medsökandes arbetsgivare för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes arbetsgivare för att gå vidare."),
);

const co_employment_since_year = v.pipe(
  v.string("Ange året medsökande började för att gå vidare."),
  v.nonEmpty("Ange året medsökande började för att gå vidare."),
  v.toNumber("Ange året medsökande började för att gå vidare."),
);

const co_employment_since_month = v.pipe(
  v.string("Ange månaden medsökande började för att gå vidare."),
  v.nonEmpty("Ange månaden medsökande började för att gå vidare."),
  v.toNumber("Ange månaden medsökande började för att gå vidare."),
);

const co_employment_to_year = v.pipe(
  v.string("Ange året medsökande slutar för att gå vidare."),
  v.nonEmpty("Ange året medsökande slutar för att gå vidare."),
  v.toNumber("Ange året medsökande slutar för att gå vidare."),
);

const co_employment_to_month = v.pipe(
  v.string("Ange månaden medsökande slutar för att gå vidare."),
  v.nonEmpty("Ange månaden medsökande slutar för att gå vidare."),
  v.toNumber("Ange månaden medsökande slutar för att gå vidare."),
);

const co_employment_monthly_income = v.pipe(
  v.string("Ange medsökandes månadsinkomst för att gå vidare."),
  v.nonEmpty("Ange medsökandes månadsinkomst för att gå vidare."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(9_167, "Månadsinkomsten är för låg. Du kan som lägst ange 9 167 kr/mån."),
  v.maxValue(800_000, "Månadsinkomsten är för hög. Du kan som högst ange 800 000 kr/mån."),
);

const co_employment_monthly_pension = v.pipe(
  v.string("Ange medsökandes pension för att gå vidare."),
  v.nonEmpty("Ange medsökandes pension för att gå vidare."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(1, "Ange medsökandes pension för att gå vidare."),
  v.maxValue(800_000, "Pensionen är för hög. Du kan som högst ange 800 000 kr/mån."),
);

const co_employment_profession = v.pipe(
  v.string("Ange medsökandes yrke för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes yrke för att gå vidare."),
);

const co_employment_income_in_foreign_currency = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."),
  v.transform((value) => value === String(true)),
);

// Variants
const employer = {
  co_employment_company_name,
  co_employment_since_year,
  co_employment_since_month,
};

const retirement = v.object({
  co_employment_monthly_pension,
  co_employment_income_in_foreign_currency,
});

const student = v.object({
  co_employment_monthly_income,
  co_employment_income_in_foreign_currency,
});

const temporary = v.object({
  ...employer,
  co_employment_to_year,
  co_employment_to_month,
  co_employment_profession,
  co_employment_monthly_income,
  co_employment_income_in_foreign_currency,
});

const permanent = v.object({
  ...employer,
  co_employment_profession,
  co_employment_monthly_income,
  co_employment_income_in_foreign_currency,
});

const selfEmployment = v.object({
  ...employer,
  co_employment_monthly_income,
  co_employment_income_in_foreign_currency,
});

export default function buildSchema(employmentType: string): FormSchema {
  const { hasEmployer, hasEndDate, hasPension, hasProfession } = getEmploymentFields(employmentType);

  // Without an employer
  if (hasPension) return retirement;
  if (!hasEmployer) return student;

  // With an employer
  if (hasEndDate) return temporary;
  if (hasProfession) return permanent;

  return selfEmployment;
}
