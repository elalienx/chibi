// Project files
import type { PropertyType } from "../../types/PropertyType";
import type { TenancyType } from "../../types/TenancyType";

export default function requiresMonthlyFee(propertyType: PropertyType, tenancyType: TenancyType): boolean {
  const isApartment = propertyType === "apartment";
  const isTenancyWithAgreement = tenancyType === "agreement";

  return isApartment || isTenancyWithAgreement;
}
