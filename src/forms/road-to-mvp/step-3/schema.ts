// Node modules
import * as v from "valibot";

export const schema = v.object({
  size: v.pipe(
    v.string("Ange bostadens månadsavgift för att gå vidare."),
    v.nonEmpty("Ange bostadens månadsavgift för att gå vidare."),
    v.transform((value) => Number(value)),
    v.number("Must be a valid number."),
    v.minValue(1, "Ange bostadens månadsavgift för att gå vidare."),
    v.maxValue(2_000, "Boytan är för stor. Du kan som störst ange en boyta på 2000 kvm."),
  ),
  rooms: v.pipe(
    v.string("Ange hur många rum bostaden har för att gå vidare."),
    v.nonEmpty("Ange hur många rum bostaden har för att gå vidare."),
    v.transform((value) => Number(value)),
    v.number("Must be a valid number."),
    v.minValue(1, "Du har angivit för få rum. Du kan som lägst ange 1 rum."),
    v.maxValue(10, "Du har angivit för många rum. Du kan som högst ange 10 rum."),
  ),
  monthly_fee: v.pipe(
    v.string("Ange bostadens månadsavgift för att gå vidare."),
    v.nonEmpty("Ange bostadens månadsavgift för att gå vidare."),
    v.transform((value) => Number(value)),
    v.number("Must be a valid number"),
    v.minValue(1, "Ange bostadens månadsavgift för att gå vidare."),
    v.maxValue(10_000, "Månadsavgiften är för hög. Du kan som högst ange en avgift på 100 000 kr/mån."),
  ),
});

export default schema;
