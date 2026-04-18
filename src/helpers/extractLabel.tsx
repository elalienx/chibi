// Node modules
import { Children, isValidElement, cloneElement, type ReactNode } from "react";

// Project files
import Label from "components/label/Label";

export default function extractLabel(children: ReactNode, id: string) {
  // Properties
  const reactComponents = Children.toArray(children);
  const label = reactComponents.find((child) => isValidElement(child) && child.type === Label);

  // Safeguard
  if (!label) return null;

  return cloneElement(label as any, { id } as any);
}
