export default interface FormStore {
  monthly_fee: number; // Dynamic field depending on property_type == "apartment"
  operating_cost: number; // Dynamic field depending on property_type != "apartment"
  property_type: string; // Convert to "house" | "apartment" | "terraced_house" | "holiday_home" | undefined;
  rooms: number;
  size: number;
}
