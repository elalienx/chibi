// Node modules
import { type ReactNode, Children, isValidElement, cloneElement } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import SelectorOption from "components/selector-option/SelectorOption";

/**
 * React lacks a "slot" feature like Vue does to pass props to children without prop drilling or using Context API.
 *
 * This method replicates it so `<SelectorGroup/>` can pass props to any `<SelectorOption/>`.
 */
export default function extractRadioOptions(children: ReactNode, id: string, field: FieldStore) {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === SelectorOption)
    .map((child) => cloneElement(child as any, { id, field } as any));
}
