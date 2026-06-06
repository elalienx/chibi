// Node modules
import * as v from "valibot";

// Fields
const has_existing_loans = v.pipe(
  v.string("Say either yes or no."),
  v.transform((value) => value === "true"),
);

const last_year_turnover = v.pipe(
  v.string("Write a quantity"),
  v.toNumber("Write a quantity"),
  v.minValue(200_000, "Must be higher than 200 000kr"),
  v.maxValue(10_000_000, "Must be lower than 10 000 000kr"),
);

const loan_debt = v.pipe(
  v.string("Write a quantity"),
  v.toNumber("Write a quantity"),
  v.minValue(200_000, "Must be higher than 200 000kr"),
  v.maxValue(10_000_000, "Must be lower than 10 000 000kr"),
);

const loan_purpose = v.string("Choose a loan purpose");

// Schema
const schema = v.object({ has_existing_loans, last_year_turnover, loan_debt, loan_purpose });

export default schema;
