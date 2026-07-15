// Node modules
import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ElementType, ReactElement } from "react";

/**
 * React lacks a "slot" feature like Vue does to pass props to children without prop drilling or using Context API.
 *
 * This method builds on top of `extractComponents()` so form field groups can pass props to their option components.
 */
function extractOptions<Props extends {}>(componentType: ElementType, children: ReactNode, props: Props) {
  const componentGroup = Children.toArray(children);
  const rawProps = Object.entries(props).filter(([_, value]) => value !== undefined);
  const cleanProps = Object.fromEntries(rawProps);

  return componentGroup
    .filter((child) => isValidElement(child) && child.type === componentType)
    .map((child) => cloneElement(child as ReactElement, cleanProps as Partial<any>));
}

export default extractOptions;
