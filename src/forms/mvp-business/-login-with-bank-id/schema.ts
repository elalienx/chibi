// Node modules
import * as v from "valibot";

// Fields
const ssn = v.pipe(
  v.string("Vänligen ange ditt personnummer."),
  v.trim(),
  v.nonEmpty("Vänligen ange ditt personnummer."),
  v.regex(/^\d{12}$/, "Vänligen ange ett giltigt personnummer med 12 siffror (ÅÅÅÅMMDDXXXX)."),
);

// Schema
const schema = v.object({ ssn });

export default schema;
