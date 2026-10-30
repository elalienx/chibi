// Node modules
import * as v from "valibot";

// Fields
const civil_status = v.pipe(
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
  v.nonEmpty("Svara ja eller nej för att gå vidare."), // input radio send us a string even if we send a boolean
  v.transform((value) => value === String(true)), // thus, this converts it back to boolean
);

const is_not_pep = v.optional(v.boolean(), true); // We use optional() because the user certifies it by default

// Schema
const schema = v.object({ civil_status, email, phone, employment_type, has_co_applicant, is_not_pep });

export default schema;
