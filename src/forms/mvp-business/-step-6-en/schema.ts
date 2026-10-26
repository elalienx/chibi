// Node modules
import * as v from "valibot";

// Project files
import businessFormConfig from "../data/businessFormConfig";

// Properties
const { MAX_PRIVATE_LOAN } = businessFormConfig;

// Fields
function debt(message: string) {
  return v.pipe(
    v.string(message),
    v.nonEmpty(message),
    v.toNumber(message),
    v.maxValue(
      MAX_PRIVATE_LOAN,
      `Högsta värdet på fastigheten är ${MAX_PRIVATE_LOAN.toLocaleString("sv-SE")}, ring in till kundstjänst för att få vidare hjälp`,
    ),
  );
}

const blanco_loans = debt("Vänligen ange skuld på blancolån, lägsta värde är 0.");

const installment_loans = debt("Vänligen ange skuld på avbetalningskrediter, lägsta värde är 0.");

const house_loans = debt("Vänligen ange skuld på bolån, lägsta värde är 0.");

// Schema
const schema = v.object({ blanco_loans, installment_loans, house_loans });

export default schema;
