import * as v from "valibot";

const schema = v.intersect([
  v.object({
    size: v.pipe(
      v.string("Ange bostadens yta för att gå vidare."),
      v.nonEmpty("Ange bostadens yta för att gå vidare."),
      v.transform((value) => Number(value)),
      v.number("Must be a valid number."),
      v.minValue(1, "Boytan är för liten."),
      v.maxValue(2000, "Boytan är för stor. Max 2000 kvm."),
    ),
    rooms: v.pipe(
      v.string("Ange hur många rum bostaden har för att gå vidare."),
      v.nonEmpty("Ange hur många rum bostaden har för att gå vidare."),
      v.transform((value) => Number(value)),
      v.number("Must be a valid number."),
      v.minValue(1, "Du kan som lägst ange 1 rum."),
      v.maxValue(10, "Du kan som högst ange 10 rum."),
    ),
    property_type: v.picklist(["house", "apartment", "terraced_house", "holiday_home"]),
  }),

  // Conditional fields based on property_type
  v.variant("property_type", [
    v.object({
      property_type: v.literal("apartment"),
      monthly_fee: v.pipe(
        v.string("Ange bostadens månadsavgift för att gå vidare."),
        v.nonEmpty("Ange bostadens månadsavgift för att gå vidare."),
        v.transform((value) => Number(value)),
        v.number("Must be a valid number"),
        v.minValue(1, "Ange bostadens månadsavgift för att gå vidare."),
        v.maxValue(10_000, "Månadsavgiften är för hög. Max 10 000 kr/mån."),
      ),
    }),
    v.object({
      property_type: v.union([v.literal("house"), v.literal("terraced_house"), v.literal("holiday_home")]),
      operating_cost: v.pipe(
        v.string("Ange bostadens driftskostnad för att gå vidare."),
        v.nonEmpty("Ange bostadens driftskostnad för att gå vidare."),
        v.transform((value) => Number(value)),
        v.number("Must be a valid number"),
        v.minValue(1, "Ange bostadens driftskostnad för att gå vidare."),
        v.maxValue(10_000, "Driftskostnaden är för hög. Max 10 000 kr/mån."),
      ),
    }),
  ]),
]);

export default schema;
