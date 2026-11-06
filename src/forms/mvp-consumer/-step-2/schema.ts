// Node modules
import * as v from "valibot";

// Fields
// Always answered because it starts on "Nej".
const has_co_applicant = v.pipe(
  v.string(),
  v.transform((value) => value === String(true)),
);

// Schema
const schema = v.object({
  has_co_applicant,
});

export default schema;
