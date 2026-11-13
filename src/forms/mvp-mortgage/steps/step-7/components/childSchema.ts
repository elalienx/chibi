// Node modules
import * as v from "valibot";

// Fields
const child_age = v.pipe(
  v.string("Ange barnets ålder för att gå vidare."),
  v.nonEmpty("Ange barnets ålder för att gå vidare."),
  v.toNumber("Ange barnets ålder för att gå vidare."),
);

const child_receives_allowance = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."),
  v.transform((value) => value === String(true)),
);

const child_lives_with_applicant = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."),
  v.transform((value) => value === String(true)),
);

const child_shared_custody = v.pipe(
  v.string("Svara ja eller nej för att gå vidare."),
  v.nonEmpty("Svara ja eller nej för att gå vidare."),
  v.transform((value) => value === String(true)),
);

const child_maintenance = v.pipe(
  v.string("Välj ett alternativ för att gå vidare."),
  v.picklist(["pays", "receives", "none"], "Välj ett alternativ för att gå vidare."),
);

const childSchema = v.object({
  child_age,
  child_receives_allowance,
  child_lives_with_applicant,
  child_shared_custody,
  child_maintenance,
});

export default childSchema;
