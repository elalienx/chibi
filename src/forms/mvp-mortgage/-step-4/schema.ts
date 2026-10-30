// Node modules
import * as v from "valibot";

// Properties
const ssnDigits: RegExp = /^\d{12}$/;

// Fields
const co_applicant_relation = v.pipe(
  v.string("Ange din relation till medsökande för att gå vidare."),
  v.nonEmpty("Ange din relation till medsökande för att gå vidare."),
);

const co_applicant_ssn = v.pipe(
  v.string("Ange medsökandes personnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes personnummer för att gå vidare."),
  v.regex(ssnDigits, "Ange ett giltigt personnummer med 12 siffror (ÅÅÅÅMMDDXXXX)."),
);

const co_applicant_civil_status = v.pipe(
  v.string("Ange medsökandes civilstånd för att gå vidare."),
  v.nonEmpty("Ange medsökandes civilstånd för att gå vidare."),
);

const co_applicant_email = v.pipe(
  v.string("Ange medsökandes e-postadress för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes e-postadress för att gå vidare."),
  v.email("Ange en giltig e-postadress."),
);

const co_applicant_phone = v.pipe(
  v.string("Ange medsökandes mobilnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes mobilnummer för att gå vidare."),
  v.check((input) => /^\+?\d{7,15}$/.test(input.replace(/[\s()-]/g, "")), "Ange ett giltigt mobilnummer."),
);

const co_applicant_employment_type = v.pipe(
  v.string("Ange medsökandes anställningsform för att gå vidare."),
  v.nonEmpty("Ange medsökandes anställningsform för att gå vidare."),
);

const co_applicant_is_not_pep = v.optional(v.boolean(), true); // We use optional() because the user certifies it by default

// Schema
const schema = v.object({
  co_applicant_relation,
  co_applicant_ssn,
  co_applicant_civil_status,
  co_applicant_email,
  co_applicant_phone,
  co_applicant_employment_type,
  co_applicant_is_not_pep,
});

export default schema;
