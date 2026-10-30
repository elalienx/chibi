// Node modules
import * as v from "valibot";

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

const main_employment_to_year = v.optional(v.string(), ""); // Optional until we know when the end date is required

const main_employment_to_month = v.optional(v.string(), ""); // Optional until we know when the end date is required

const main_employment_monthly_income = v.pipe(
  v.string("Ange din månadsinkomst för att gå vidare."),
  v.nonEmpty("Ange din månadsinkomst för att gå vidare."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(9_167, "Månadsinkomsten är för låg. Du kan som lägst ange 9 167 kr/mån."),
  v.maxValue(800_000, "Månadsinkomsten är för hög. Du kan som högst ange 800 000 kr/mån."),
);

const main_employment_profession = v.pipe(
  v.string("Ange ditt yrke för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange ditt yrke för att gå vidare."),
);

const main_employment_income_in_foreign_currency = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."), // input radio send us a string even if we send a boolean
  v.transform((value) => value === String(true)), // thus, this converts it back to boolean
);

// Schema
const schema = v.object({
  main_employment_company_name,
  main_employment_since_year,
  main_employment_since_month,
  main_employment_to_year,
  main_employment_to_month,
  main_employment_monthly_income,
  main_employment_profession,
  main_employment_income_in_foreign_currency,
});

export default schema;
