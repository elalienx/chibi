// Node modules
import * as v from "valibot";

// Fields
const purpose = v.pipe(v.string("Vänligen ange lånesyfte"), v.nonEmpty("Vänligen ange lånesyfte"));

const loan_purpose_details = v.optional(v.string());

// Schema
const schema = v.object({ purpose, loan_purpose_details });

export default schema;
