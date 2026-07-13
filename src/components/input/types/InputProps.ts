// Node modules
import type { FormStore } from "@formisch/react";

/**
 * About:
 * We split the Input component into InputText and InputNumber as we have too many customizations just for number which clutters the other component.
 */
export default interface InputProps {
  /** Unique identifier of a form field. */
  id?: string;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** An example value to show when the field is empty. */
  placeholder?: string;

  /** Decoration text on the right side of the input. Used to indicate a currency or measurement unit. */
  suffix?: string;

  /** Decides what kind of keyboard to show on mobile. This does not affect validation. Handle that separately. */
  type: "email" | "number" | "password" | "tel" | "text";
}
