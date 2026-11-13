// Node modules
import * as v from "valibot";

// Fields
const household_adults = v.pipe(
  v.string(),
  v.nonEmpty("Ange hur många vuxna som bor i hushållet."),
  v.toNumber("Du kan bara använda dig utav siffror."),
);

const schema = v.object({
  household_adults,
});

export default schema;
