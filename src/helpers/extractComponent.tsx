// Node modules
import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ElementType, ReactElement } from "react";

/**
 * React lacks a "slot" feature like Vue does to pass props to children without prop drilling or using Context API.
 *
 * This method replicates the slots so form fields can pass props to their inner components.
 */
function extractComponent<Props extends {}>(componentType: ElementType, children: ReactNode, props: Props) {
  const components = Children.toArray(children);
  const child = components.find((child) => isValidElement(child) && child.type === componentType);
  const rawProps = Object.entries(props).filter(([_, value]) => value !== undefined);
  const cleanProps = Object.fromEntries(rawProps);

  // Safeguards
  if (!child) return null;

  return cloneElement(child as ReactElement, cleanProps as Partial<unknown>);
}

export default extractComponent;
