// Node modules
import * as v from "valibot";

// Fields
const email = v.pipe(
  v.string("Must be a valid string"),
  v.nonEmpty("Must be a valid string"),
  v.email("Must be a valid email"),
);

const phone = v.pipe(
  v.string("Must be a valid string"),
  v.nonEmpty("Must be a valid string"),
  v.email("Must be a valid phone"),
);

const schema = v.object({ email, phone });

export default schema;
