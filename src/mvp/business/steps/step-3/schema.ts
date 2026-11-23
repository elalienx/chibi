// Node modules
import * as v from "valibot";

// Fields
const company_org_number = v.pipe(v.string("Vänligen välj bolag."), v.nonEmpty("Vänligen välj bolag."));

// Schema
const schema = v.object({ company_org_number });

export default schema;
