// Node modules
import { Children, isValidElement, cloneElement, type ReactNode } from "react";

// Project files
import Select from "components/select/Select";

/**
 * React lacks a "slot" feature like Vue does to pass props to children without prop drilling or using Context API.
 *
 * This method replicates it so `<SelectGroup/>` can pass props to the `<Select/>`.
 */
export default function extractInput(
  id: string,
  anchorId: string,
  children: ReactNode,
  listId: string,
  activeOptionText: ReactNode,
) {
  // Properties
  const reactComponents = Children.toArray(children);
  const input = reactComponents.find((child) => isValidElement(child) && child.type === Select);

  // Safeguard
  if (!input) return null;

  return cloneElement(input as any, { id, anchorId, listId, activeOptionText } as any);
}
