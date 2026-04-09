// Project files
import type { PropertyType } from "./PropertyType";

export default interface LoanApplicationStore {
  monthly_fee: number /** Dynamic field depending on property_type == "apartment" */;
  operating_cost: number /** Dynamic field depending on property_type != "apartment" */;
  property_type: PropertyType;
  size: number;
}
