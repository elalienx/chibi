// Node modules
import { Children, isValidElement, cloneElement, type ReactNode } from "react";
import type { FormStore } from "@formisch/react";

// Project files
import Input from "components/input/Input";

export default function extractInput(children: ReactNode, id: string, form: FormStore) {
  const reactComponents = Children.toArray(children);
  const input = reactComponents.find((child) => isValidElement(child) && child.type === Input);

  return input && isValidElement(input) ? cloneElement(input, { id, form } as any) : null;
}
