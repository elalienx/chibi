// Node modules
import * as v from "valibot";

// Properties
const ssnDigits: RegExp = /^\d{12}$/;
const phoneDigits: RegExp = /^\+?\d{7,15}$/;
const phoneFormatting: RegExp = /[\s()-]/g;

// Fields (main applicant)
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
  v.check((input) => phoneDigits.test(input.replace(phoneFormatting, "")), "Ange ett giltigt mobilnummer."),
);

const main_ssn = v.pipe(
  v.string("Ange ditt personnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange ditt personnummer för att gå vidare."),
  v.regex(ssnDigits, "Ange ett giltigt personnummer med 12 siffror (ÅÅÅÅMMDDXXXX)."),
);

const main_civil_state = v.pipe(
  v.string("Ange civilstatus för att gå vidare."),
  v.nonEmpty("Ange civilstatus för att gå vidare."),
);

const main_children_under_21 = v.pipe(
  v.string("Ange antal barn under 21 år för att gå vidare."),
  v.nonEmpty("Ange antal barn under 21 år för att gå vidare."),
  v.toNumber(),
);

// Fields (co-applicant)
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
  v.check((input) => phoneDigits.test(input.replace(phoneFormatting, "")), "Ange ett giltigt mobilnummer."),
);

const co_ssn = v.pipe(
  v.string("Ange medsökandes personnummer för att gå vidare."),
  v.trim(),
  v.nonEmpty("Ange medsökandes personnummer för att gå vidare."),
  v.regex(ssnDigits, "Ange ett giltigt personnummer med 12 siffror (ÅÅÅÅMMDDXXXX)."),
);

const co_civil_state = v.pipe(
  v.string("Ange medsökandes civilstatus för att gå vidare."),
  v.nonEmpty("Ange medsökandes civilstatus för att gå vidare."),
);

const co_children_under_21 = v.pipe(
  v.string("Ange medsökandes antal barn under 21 år för att gå vidare."),
  v.nonEmpty("Ange medsökandes antal barn under 21 år för att gå vidare."),
  v.toNumber(),
);

// Schemas
const mainApplicant = { main_email, main_phone, main_ssn, main_civil_state, main_children_under_21 };
const coApplicant = { co_email, co_phone, co_ssn, co_civil_state, co_children_under_21 };

export default function buildSchema(hasCoApplicant: boolean) {
  if (hasCoApplicant) return v.object({ ...mainApplicant, ...coApplicant });

  return v.object(mainApplicant);
}
