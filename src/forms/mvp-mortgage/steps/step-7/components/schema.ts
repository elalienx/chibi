// Node modules
import * as v from "valibot";

// Fields
const child_age = v.pipe(
  v.string("Ange barnets ålder för att gå vidare."),
  v.nonEmpty("Ange barnets ålder för att gå vidare."),
  v.toNumber("Ange barnets ålder för att gå vidare."),
);

const child_receives_allowance = v.pipe(
  v.string("Ange om du får barn- eller studiebidrag för barnet, eller inte."),
  v.nonEmpty("Ange om du får barn- eller studiebidrag för barnet, eller inte."),
  v.transform((value) => value === String(true)),
);

const child_lives_with_applicant = v.pipe(
  v.string("Ange om barnet bor hos dig, eller inte."),
  v.nonEmpty("Ange om barnet bor hos dig, eller inte."),
  v.transform((value) => value === String(true)),
);

const child_shared_custody = v.pipe(
  v.string("Ange om du har delad vårdnad om barnet, eller inte."),
  v.nonEmpty("Ange om du har delad vårdnad om barnet, eller inte."),
  v.transform((value) => value === String(true)),
);

const child_maintenance = v.pipe(
  v.string("Ange om du betalar eller får underhåll för barnet."),
  v.picklist(["pays", "receives", "none"], "Ange om du betalar eller får underhåll för barnet."),
);

const schema = v.object({
  child_age,
  child_receives_allowance,
  child_lives_with_applicant,
  child_shared_custody,
  child_maintenance,
});

export default schema;
