// Node modules
import * as v from "valibot";

// Fields
const is_guarantor = v.pipe(
  v.string("Gör ett val för att fortsätta."),
  v.nonEmpty("Gör ett val för att fortsätta."),
  v.transform((value) => value === String(true)),
);

// Schema
const schema = v.object({ is_guarantor });

export default schema;
