// Node modules
import * as v from "valibot";

// Fields
const civil_state = v.pipe(
  v.string("Ange civilstånd för att gå vidare."),
  v.nonEmpty("Ange civilstånd för att gå vidare."),
);

const email = v.pipe(
  v.string("Ange din e-postadress för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange din e-postadress för att gå vidare."),
  v.email("Ange en giltig e-postadress."),
);

const phone = v.pipe(
  v.string("Ange ditt mobilnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange ditt mobilnummer för att gå vidare."),
  v.check((input) => /^\+?\d{7,15}$/.test(input.replace(/[\s()-]/g, "")), "Ange ett giltigt mobilnummer."),
);

const employment_type = v.pipe(
  v.string("Ange anställningsform för att gå vidare."),
  v.nonEmpty("Ange anställningsform för att gå vidare."),
);

const has_co_applicant = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."),
  v.transform((value) => value === String(true)),
);

// The checkbox certifies the user is NOT a PEP, so a checked box means claims_pep is false.
const claims_pep = v.pipe(
  v.optional(v.boolean(), true),
  v.transform((isNotPEP) => !isNotPEP),
);

// Schema
const schema = v.object({
  civil_state,
  email,
  phone,
  employment_type,
  has_co_applicant,
  claims_pep,
});

export default schema;
