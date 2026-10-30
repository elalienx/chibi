// Node modules
import * as v from "valibot";

// Properties
const ssnDigits: RegExp = /^\d{12}$/;

// Fields
const co_relationship_with_main_applicant = v.pipe(
  v.string("Ange din relation till medsökande för att gå vidare."),
  v.nonEmpty("Ange din relation till medsökande för att gå vidare."),
);

const co_ssn = v.pipe(
  v.string("Ange medsökandes personnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes personnummer för att gå vidare."),
  v.regex(ssnDigits, "Ange ett giltigt personnummer med 12 siffror (ÅÅÅÅMMDDXXXX)."),
);

const co_civil_state = v.pipe(
  v.string("Ange medsökandes civilstånd för att gå vidare."),
  v.nonEmpty("Ange medsökandes civilstånd för att gå vidare."),
);

const co_email = v.pipe(
  v.string("Ange medsökandes e-postadress för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes e-postadress för att gå vidare."),
  v.email("Ange en giltig e-postadress."),
);

const co_phone = v.pipe(
  v.string("Ange medsökandes mobilnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes mobilnummer för att gå vidare."),
  v.check((input) => /^\+?\d{7,15}$/.test(input.replace(/[\s()-]/g, "")), "Ange ett giltigt mobilnummer."),
);

const co_employment_type = v.pipe(
  v.string("Ange medsökandes anställningsform för att gå vidare."),
  v.nonEmpty("Ange medsökandes anställningsform för att gå vidare."),
);

// The checkbox certifies the co-applicant is NOT a PEP, so a checked box means claims_pep is false.
const co_claims_pep = v.pipe(
  v.optional(v.boolean(), true), // We use optional() because the user certifies it by default
  v.transform((isNotPEP) => !isNotPEP),
);

// Schema
const schema = v.object({
  co_relationship_with_main_applicant,
  co_ssn,
  co_civil_state,
  co_email,
  co_phone,
  co_employment_type,
  co_claims_pep,
});

export default schema;
