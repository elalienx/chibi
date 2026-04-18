// Node modules
import { Children, isValidElement, cloneElement, type ReactNode } from "react";
import type { FormStore } from "@formisch/react";

// Project files
import Input from "components/input/Input";

export default function extractInput(children: ReactNode, id: string, form: FormStore) {
  // Properties
  const reactComponents = Children.toArray(children);
  const input = reactComponents.find((child) => isValidElement(child) && child.type === Input);

  // Safeguard
  if (!input) return null;

  return cloneElement(input as any, { id, form } as any);
}
