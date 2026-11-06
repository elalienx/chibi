// Node modules
import * as v from "valibot";

// Properties
const ssnDigits: RegExp = /^\d{12}$/;

// Fields
const relationship_with_main_applicant = v.pipe(
  v.string("Ange din relation till medsökande för att gå vidare."),
  v.nonEmpty("Ange din relation till medsökande för att gå vidare."),
);

const ssn = v.pipe(
  v.string("Ange medsökandes personnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes personnummer för att gå vidare."),
  v.regex(ssnDigits, "Ange ett giltigt personnummer med 12 siffror (ÅÅÅÅMMDDXXXX)."),
);

const civil_state = v.pipe(
  v.string("Ange medsökandes civilstånd för att gå vidare."),
  v.nonEmpty("Ange medsökandes civilstånd för att gå vidare."),
);

const email = v.pipe(
  v.string("Ange medsökandes e-postadress för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes e-postadress för att gå vidare."),
  v.email("Ange en giltig e-postadress."),
);

const phone = v.pipe(
  v.string("Ange medsökandes mobilnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes mobilnummer för att gå vidare."),
  v.check((input) => /^\+?\d{7,15}$/.test(input.replace(/[\s()-]/g, "")), "Ange ett giltigt mobilnummer."),
);

const employment_type = v.pipe(
  v.string("Ange medsökandes anställningsform för att gå vidare."),
  v.nonEmpty("Ange medsökandes anställningsform för att gå vidare."),
);

// The checkbox certifies the co-applicant is NOT a PEP, so a checked box means claims_pep is false.
const claims_pep = v.pipe(
  v.optional(v.boolean(), true),
  v.transform((isNotPEP) => !isNotPEP),
);

// Schema
const schema = v.object({
  relationship_with_main_applicant,
  ssn,
  civil_state,
  email,
  phone,
  employment_type,
  claims_pep,
});

export default schema;
