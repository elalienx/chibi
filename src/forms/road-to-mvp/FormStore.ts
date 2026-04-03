export interface FormStore {
  monthly_fee: number; // Dynamic field depending on property_type == "apartment"
  operating_cost: number; // Dynamic field depending on property_type != "apartment"
  property_type: "house" | "apartment" | "terraced_house" | "holiday_home" | undefined;
  rooms: number;
  size: number;
}

export const initialFormStore: FormStore = {
  monthly_fee: 0,
  operating_cost: 0,
  property_type: undefined,
  rooms: 0,
  size: 0,
};
