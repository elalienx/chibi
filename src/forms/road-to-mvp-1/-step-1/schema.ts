// Node modules
import * as v from "valibot";

export const schema = v.object({
  property_type: v.string("Välj en fastighetstyp för att gå vidare."),
});

export default schema;
