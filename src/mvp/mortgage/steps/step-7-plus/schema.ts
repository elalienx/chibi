// Node modules
import * as v from "valibot";

// Project files
import childSchema from "../step-7/components/child-form/schema";

// Children schema. All children live in one form, so every sub-form stays open at the same time.
const schemaChildren = v.object({
  household_children: v.array(childSchema),
});

export default schemaChildren;
