// Node modules
import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ElementType, ReactElement } from "react";

/**
 * Extracts all instances of a specific component type from children
 * and clones them with injected props.
 */
function extractComponentGroup<Props extends {}>(componentType: ElementType, children: ReactNode, props: Props) {
  const componentGroup = Children.toArray(children);
  const rawProps = Object.entries(props).filter(([_, value]) => value !== undefined);
  const cleanProps = Object.fromEntries(rawProps);

  return componentGroup
    .filter((child) => isValidElement(child) && child.type === componentType)
    .map((child) => cloneElement(child as ReactElement, cleanProps as Partial<any>));
}

export default extractComponentGroup;
