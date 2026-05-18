// Node modules
import { type ReactNode, Children, isValidElement, cloneElement } from "react";
import type { FieldStore } from "@formisch/react";

// Project files
import SelectOption from "components/select-option/SelectOption";

/**
 * React lacks a "slot" feature like Vue does to pass props to children without prop drilling or using Context API.
 *
 * This method replicates it so `<Select/>` can pass props to any `<SelectOption/>`.
 */
export default function extractSelectOptions(id: string, children: ReactNode, field: FieldStore, selectListId: string) {
  return Children.toArray(children)
    .filter((child) => isValidElement(child) && child.type === SelectOption)
    .map((child) => cloneElement(child as any, { id, field, selectListId } as any));
}
