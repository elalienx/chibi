// Node modules
import { Children, isValidElement, cloneElement } from "react";
import type { ReactNode, ElementType, ReactElement } from "react";

interface Props<TProps extends {}> {
  /** The specific React component type to search for within the children. */
  component: ElementType;

  /** The React children elements to parse. */
  extractFrom: ReactNode;

  /** The props to inject into the extracted component. Undefined values will be filtered out. */
  props: TProps;
}

/**
 * React does not have Vue's "slot" feature to pass props to children without prop drilling or using Context API.
 *
 * This method replicates the slots so form fields can pass props to their inner components.
 */
export default function extractComponent<TProps extends {}>({ component, extractFrom, props }: Props<TProps>) {
  const components = Children.toArray(extractFrom);
  const child = components.find((child) => isValidElement(child) && child.type === component);
  const rawProps = Object.entries(props).filter(([_, value]) => value !== undefined);
  const cleanProps = Object.fromEntries(rawProps);

  // Safeguards
  if (!child) return null;

  return cloneElement(child as ReactElement, cleanProps as Partial<unknown>);
}
