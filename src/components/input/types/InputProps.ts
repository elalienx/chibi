// Node modules
import type { FormStore, RequiredPath } from "@formisch/react";

/**
 * About:
 * We split the Input component into InputText, InputNumber, and InputTelephone as we have too many customizations just for number and telephone which clutters the other component.
 */
export default interface InputProps {
  /** Unique identifier of a form field. */
  id?: RequiredPath;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** Use for input number fields which require decimals. */
  allowDecimals?: boolean;

  /** Used to display the user-friendly name of the select option; otherwise, it would show the database value. Example: "car_2" instead of "Bil Två". */
  displayValue?: string;

  /** The maximum value allowed for number inputs. */
  max?: number;

  /** The minimum value allowed for number inputs. */
  min?: number;

  /** An example value to show when the field is empty. */
  placeholder?: string;

  /** Prevents direct text editing when Input is used as a Select trigger. */
  readOnly?: boolean;

  /** Decoration text on the right side of the input. Used to indicate a currency or measurement unit. */
  suffix?: string;

  /** Decides what kind of keyboard to show on mobile. This does not affect validation. Handle that separately. */
  type: "email" | "number" | "password" | "tel" | "text";
}
