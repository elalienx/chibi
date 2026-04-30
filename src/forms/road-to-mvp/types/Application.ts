// Project files
import type { PropertyType } from "./PropertyType";
import type { TenancyType } from "./TenancyType";

export default interface Application {
  monthly_fee: number /** Dynamic field depending on property_type and tenancy_agreement. */;
  operating_cost: number /** Dynamic field depending on property_type and tenancy_agreement. */;
  property_type: PropertyType;
  tenancy_type: TenancyType;
  rooms: number;
  size: number;
}
