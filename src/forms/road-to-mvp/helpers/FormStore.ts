export interface FormStore {
  monthly_fee: number; // Dynamic field depending on property_type == "apartment"
  operating_cost: number; // Dynamic field depending on property_type != "apartment"
  property_type: string; // Convert to "house" | "apartment" | "terraced_house" | "holiday_home" | undefined;
  rooms: number;
  size: number;
}

export const initialFormStore: FormStore = {
  monthly_fee: 0,
  operating_cost: 0,
  property_type: "",
  rooms: 0,
  size: 0,
};
