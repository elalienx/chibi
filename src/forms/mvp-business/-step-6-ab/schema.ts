// Node modules
import * as v from "valibot";

// Fields
const is_guarantor = v.pipe(
  v.string(),
  v.transform((value) => value === String(true)),
);

// Schema
const schema = v.object({ is_guarantor });

export default schema;
