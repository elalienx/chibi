// Node modules
import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ElementType, ReactElement } from "react";

/**
 * Replicates a "slot" feature by extracting a specific component type from children
 * and cloning it with injected props.
 */
function extractComponent<Props extends {}>(componentType: ElementType, children: ReactNode, props: Props) {
  const components = Children.toArray(children);
  const child = components.find((child) => isValidElement(child) && child.type === componentType);
  const rawProps = Object.entries(props).filter(([_, value]) => value !== undefined);
  const cleanProps = Object.fromEntries(rawProps);

  // Safeguard
  if (!child) return null;

  return cloneElement(child as ReactElement, cleanProps as Partial<unknown>);
}

export default extractComponent;
