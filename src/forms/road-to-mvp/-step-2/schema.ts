// Node modules
import * as v from "valibot";
import type { PropertyType } from "../types/PropertyType";

// Fields
const monthly_fee = v.pipe(
  v.string("Ange bostadens månadsavgift för att gå vidare."),
  v.nonEmpty("Ange bostadens månadsavgift för att gå vidare."),
  v.transform((value) => Number(value)),
  v.number("Must be a valid number"),
  v.minValue(1, "Ange bostadens månadsavgift för att gå vidare."),
  v.maxValue(10_000, "Månadsavgiften är för hög. Max 10 000 kr/mån."),
);

const operating_cost = v.pipe(
  v.string("Ange bostadens driftskostnad för att gå vidare."),
  v.nonEmpty("Ange bostadens driftskostnad för att gå vidare."),
  v.transform((value) => Number(value)),
  v.number("Must be a valid number"),
  v.minValue(1, "Ange bostadens driftskostnad för att gå vidare."),
  v.maxValue(10_000, "Driftskostnaden är för hög. Max 10 000 kr/mån."),
);

const rooms = v.pipe(
  v.string("Ange hur många rum bostaden har för att gå vidare."),
  v.nonEmpty("Ange hur många rum bostaden har för att gå vidare."),
  v.transform((value) => Number(value)),
  v.number("Must be a valid number."),
  v.minValue(1, "Du kan som lägst ange 1 rum."),
  v.maxValue(10, "Du kan som högst ange 10 rum."),
);

const size = v.pipe(
  v.string("Ange bostadens yta för att gå vidare."),
  v.nonEmpty("Ange bostadens yta för att gå vidare."),
  v.transform((value) => Number(value)),
  v.number("Must be a valid number."),
  v.minValue(1, "Boytan är för liten."),
  v.maxValue(2_000, "Boytan är för stor. Max 2000 kvm."),
);

// Variants (for tenancy agreement)
const agreement = v.object({
  tenancy_type: v.literal("agreement"),
  monthly_fee,
});

const ownership = v.object({
  tenancy_type: v.literal("ownership"),
  operating_cost,
});

export default function getSchema(propertyType: PropertyType) {
  const defaultFields = { size, rooms };
  const defaultSchema = v.object({ ...defaultFields, operating_cost });

  // Special cases
  if (propertyType === "apartment") {
    return v.object({ ...defaultFields, monthly_fee });
  }

  if (propertyType === "terraced_house") {
    return v.intersect([
      v.object(defaultFields),
      v.variant("tenancy_type", [agreement, ownership], "Specify the type of lease."),
    ]);
  }

  return defaultSchema;
}
