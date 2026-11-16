// Node modules
import * as v from "valibot";

// Project files
import employeeSchema from "./employeeSchema";

// Fields
const company_name = v.pipe(
  v.string(),
  v.nonEmpty("Please enter the company full name."),
  v.minLength(3, "Name is too short."),
  v.maxLength(50, "Name is too long."),
);

const employees = v.array(employeeSchema); // Filled by the sub-form on each save, not by inputs in the parent form

// Schema
const companySchema = v.object({ company_name, employees });

export default companySchema;
