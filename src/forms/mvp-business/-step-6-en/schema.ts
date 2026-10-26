// Node modules
import * as v from "valibot";

// Project files
import businessFormConfig from "../data/businessFormConfig";

// Properties
const { MAX_PRIVATE_LOAN } = businessFormConfig;
const maxMessage = `Högsta värdet på fastigheten är ${MAX_PRIVATE_LOAN.toLocaleString("sv-SE")}, ring in till kundstjänst för att få vidare hjälp`;

// Fields
const blanco_loans = v.optional(v.pipe(v.string(), v.toNumber(), v.maxValue(MAX_PRIVATE_LOAN, maxMessage)), "");
const installment_loans = v.optional(v.pipe(v.string(), v.toNumber(), v.maxValue(MAX_PRIVATE_LOAN, maxMessage)), "");
const house_loans = v.optional(v.pipe(v.string(), v.toNumber(), v.maxValue(MAX_PRIVATE_LOAN, maxMessage)), "");

// Schema
const schema = v.object({ blanco_loans, installment_loans, house_loans });

export default schema;
