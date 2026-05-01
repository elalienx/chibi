// Node modules
import { getInput, type FormStore } from "@formisch/react";

// Project files
import type { TenancyType } from "forms/road-to-mvp/types/TenancyType";

export default function checkTenacyType(isTerracedHouse: boolean, form: FormStore): TenancyType {
  // Safeguard (in case the user choose another property type)
  if (!isTerracedHouse) {
    return undefined;
  }

  // @ts-ignore
  return getInput(form, { path: ["tenancy_type"] }) as TenancyType;
}
