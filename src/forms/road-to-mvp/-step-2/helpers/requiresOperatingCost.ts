// Project files
import type { PropertyType } from "../../types/PropertyType";
import type { TenancyType } from "../../types/TenancyType";

export default function requiresOperatingCost(propertyType: PropertyType, tenancyType: TenancyType): boolean {
  const isHolidayHome = propertyType === "holiday_home";
  const isHouse = propertyType === "house";
  const isTenancyWithOwnership = tenancyType === "ownership";

  return isHolidayHome || isHouse || isTenancyWithOwnership;
}
