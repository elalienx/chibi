// Node modules
import type { ChangeEvent, FocusEvent, ReactNode } from "react";
import { useField, type FormStore } from "@formisch/react";

interface Props {
  /** Unique identifier of a form field. */
  id?: string;

  /** The text to display next to the checkbox. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  form?: FormStore;

  /** The value sent to the database. */
  value?: boolean;
}

export default function Checkbox({ id, children, form, value = false }: Props) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // State
  //   @ts-ignore
  const field = useField(form, { path: [id] });

  // Properties
  const stringValue = String(value);

  // Methods
  function onChangeAndForceBlur(event: ChangeEvent<HTMLInputElement>): void {
    console.log("on click", id);

    field?.props.onChange(event); // First, the default change event.
    field?.props.onBlur(event as FocusEvent<HTMLInputElement>); // Then, blur to trigger Formisch re-validation.
  }

  return (
    <label className="checkbox">
      <input
        {...field.props}
        id={id}
        checked={field.input === stringValue}
        onChange={onChangeAndForceBlur}
        type="checkbox"
        value={stringValue}
      />
      {children}
    </label>
  );
}
