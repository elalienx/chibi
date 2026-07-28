// Node modules
import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ElementType, ReactElement } from "react";

interface Props<TProps extends {}> {
  /** The specific React component type to search for within the children. */
  component: ElementType;

  /** The React children elements to parse. */
  extractFrom: ReactNode;

  /** The props to inject into the extracted components. Undefined values will be filtered out. */
  props: TProps;
}

/**
 * React does not have Vue's "slot" feature to pass props to children without prop drilling or using Context API.
 *
 * This method builds on top of `extractComponents()` so form field groups can pass props to their option components.
 */
export default function extractOptions<TProps extends {}>({ component, extractFrom, props }: Props<TProps>) {
  const components = Children.toArray(extractFrom);
  const rawProps = Object.entries(props).filter(([_, value]) => value !== undefined);
  const cleanProps = Object.fromEntries(rawProps);

  return components
    .filter((child) => isValidElement(child) && child.type === component)
    .map((child) => cloneElement(child as ReactElement, cleanProps as Partial<any>));
}
