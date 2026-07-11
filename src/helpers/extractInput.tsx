// Node modules
import { Children, isValidElement, cloneElement, type ReactNode } from "react";
import type { FormStore } from "@formisch/react";

// Project files
import Input from "components/input/Input";

/**
 * React lacks a "slot" feature like Vue does to pass props to children without prop drilling or using Context API.
 *
 * This method replicates it so `<InputField/>` can pass props to the `<Input/>`.
 */
export default function extractInput(id: string, children: ReactNode, form: FormStore) {
  // Properties
  const reactComponents = Children.toArray(children);
  const input = reactComponents.find((child) => isValidElement(child) && child.type === Input);

  // Safeguard
  if (!input) return null;

  return cloneElement(input as any, { id, form } as any);
}
