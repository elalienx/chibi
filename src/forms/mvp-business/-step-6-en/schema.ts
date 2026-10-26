// Node modules
import * as v from "valibot";

// Project files
import businessFormConfig from "../data/businessFormConfig";

// Properties
const { MIN_EXISTING_LOAN, MAX_EXISTING_LOAN } = businessFormConfig;

// Fields
function debt(message: string) {
  return v.pipe(
    v.string(message),
    v.nonEmpty(message),
    v.toNumber(message),
    v.minValue(MIN_EXISTING_LOAN, `Måste vara minst ${MIN_EXISTING_LOAN.toLocaleString("sv-SE")} kr`),
    v.maxValue(MAX_EXISTING_LOAN, `Måste vara maximalt ${MAX_EXISTING_LOAN.toLocaleString("sv-SE")} kr`),
  );
}

const unsecured_loan_debt = debt("Vänligen ange skuld på blancolån, lägsta värde är 0.");

const installment_credit_debt = debt("Vänligen ange skuld på avbetalningskrediter, lägsta värde är 0.");

const mortgage_debt = debt("Vänligen ange skuld på bolån, lägsta värde är 0.");

// Schema
const schema = v.object({ unsecured_loan_debt, installment_credit_debt, mortgage_debt });

export default schema;
