// Node modules
import { type ReactNode, Children, isValidElement, cloneElement } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import RadioOption from "components/radio-option/RadioOption";

export default function extractRadioOptions(children: ReactNode, id: string, field: FieldStore) {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === RadioOption)
    .map((child) => cloneElement(child as any, { id, field } as any));
}
