// Node modules
import * as v from "valibot";

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

const co_employment_to_year = v.optional(v.pipe(v.string(), v.toNumber()), "");

const co_employment_to_month = v.optional(v.pipe(v.string(), v.toNumber()), "");

const co_employment_monthly_income = v.pipe(
  v.string("Ange medsökandes månadsinkomst för att gå vidare."),
  v.nonEmpty("Ange medsökandes månadsinkomst för att gå vidare."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(9_167, "Månadsinkomsten är för låg. Du kan som lägst ange 9 167 kr/mån."),
  v.maxValue(800_000, "Månadsinkomsten är för hög. Du kan som högst ange 800 000 kr/mån."),
);

const co_employment_profession = v.pipe(
  v.string("Ange medsökandes yrke för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes yrke för att gå vidare."),
);

const co_employment_income_in_foreign_currency = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."), // input radio send us a string even if we send a boolean
  v.transform((value) => value === String(true)), // thus, this converts it back to boolean
);

// Schema
const schema = v.object({
  co_employment_company_name,
  co_employment_since_year,
  co_employment_since_month,
  co_employment_to_year,
  co_employment_to_month,
  co_employment_monthly_income,
  co_employment_profession,
  co_employment_income_in_foreign_currency,
});

export default schema;
