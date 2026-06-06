// Node modules
import * as v from "valibot";

// Project files
import BusinessFormConfig from "../data/BusinessFormConfig";

// Properties
const { MIN_TURNOVER, MAX_TURNOVER, MIN_EXISTING_LOAN, MAX_EXISTING_LOAN } = BusinessFormConfig;

// Fields
const has_existing_loans = v.pipe(
  v.string("Gör ett val för att fortsätta."),
  v.transform((value) => value === "true"),
);

const turnover = v.pipe(
  v.string("Vänligen ange din omsättning från de senaste 12 månaderna, lägsta värde är 0."),
  v.toNumber("Vänligen ange din omsättning från de senaste 12 månaderna, lägsta värde är 0."),
  v.minValue(MIN_TURNOVER, `Måste vara minst ${MIN_TURNOVER.toLocaleString("sv-SE")} kr.`),
  v.maxValue(MAX_TURNOVER, `Måste vara maximalt ${MAX_TURNOVER.toLocaleString("sv-SE")} kr.`),
);

const loan_debt = v.pipe(
  v.string("Vänligen ange bolagets skulder, lägsta värde är 0."),
  v.toNumber("Vänligen ange bolagets skulder, lägsta värde är 0."),
  v.minValue(MIN_EXISTING_LOAN, `Must be higher than  ${MIN_EXISTING_LOAN.toLocaleString("sv-SE")} kr`),
  v.maxValue(MAX_EXISTING_LOAN, `Must be lower than  ${MAX_EXISTING_LOAN.toLocaleString("sv-SE")} kr`),
);

const purpose = v.string("Vänligen ange lånesyfte");

// Schema
const schema = v.object({ has_existing_loans, turnover, loan_debt, purpose });

export default schema;
