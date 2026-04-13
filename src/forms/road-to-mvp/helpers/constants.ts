// Project files
import type Application from "../types/Application";

export const initialApplication: Application = {
  monthly_fee: 0,
  operating_cost: 0,
  property_type: undefined,
  rooms: 0,
  size: 0,
};

// Property types
export const apartment = "apartment";
export const holidayHome = "holiday_home";
export const house = "house";
export const terracedHouse = "terraced_house";
