// Node modules
import * as v from "valibot";

// Fields
const household_adults = v.pipe(
  v.string(),
  v.nonEmpty("Ange hur många vuxna som bor i hushållet."),
  v.toNumber("Du kan bara använda dig utav siffror."),
  v.minValue(1, "Hushållet måste ha minst en vuxen."),
  v.maxValue(10, "Du kan som högst ange 10 vuxna."),
);

const schema = v.object({
  household_adults,
});

export default schema;
