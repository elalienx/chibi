// Node modules
import * as v from "valibot";

// Fields
const main_civil_state = v.pipe(
  v.string("Ange civilstånd för att gå vidare."),
  v.nonEmpty("Ange civilstånd för att gå vidare."),
);

const main_email = v.pipe(
  v.string("Ange din e-postadress för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange din e-postadress för att gå vidare."),
  v.email("Ange en giltig e-postadress."),
);

const main_phone = v.pipe(
  v.string("Ange ditt mobilnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange ditt mobilnummer för att gå vidare."),
  v.check((input) => /^\+?\d{7,15}$/.test(input.replace(/[\s()-]/g, "")), "Ange ett giltigt mobilnummer."),
);

const main_employment_type = v.pipe(
  v.string("Ange anställningsform för att gå vidare."),
  v.nonEmpty("Ange anställningsform för att gå vidare."),
);

const has_co_applicant = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."), // input radio send us a string even if we send a boolean
  v.transform((value) => value === String(true)), // thus, this converts it back to boolean
);

// The checkbox certifies the user is NOT a PEP, so a checked box means claims_pep is false.
const main_claims_pep = v.pipe(
  v.optional(v.boolean(), true), // We use optional() because the user certifies it by default
  v.transform((isNotPEP) => !isNotPEP),
);

// Schema
const schema = v.object({
  main_civil_state,
  main_email,
  main_phone,
  main_employment_type,
  has_co_applicant,
  main_claims_pep,
});

export default schema;
