// Node modules
import * as v from "valibot";

// Fields
const company_org_number = v.pipe(
  v.string("Vänligen välj bolag."),
  v.nonEmpty("Vänligen välj bolag."),
  v.check((input) => ["5590245535", "5590480512", "5561081620"].includes(input), "Vänligen välj ett giltigt bolag."),
);

// Schema
const schema = v.object({ company_org_number });

export default schema;
