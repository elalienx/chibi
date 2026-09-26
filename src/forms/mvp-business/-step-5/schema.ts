// Node modules
import * as v from "valibot";

// Fields
const purpose = v.pipe(v.string("Vänligen ange lånesyfte"), v.nonEmpty("Vänligen ange lånesyfte"));

// Schema
const schema = v.object({ purpose });

export default schema;
