// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore } from "@formisch/react";

// Project files
import "./checkbox.css";

interface Props {
  /** Unique identifier of a form field. */
  id?: string;

  /** The text to display next to the checkbox. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  form?: FormStore;
}

export default function Checkbox({ id, children, form }: Props) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // Local state
  const field = useField(form, { path: [id] });

  return (
    <label className="checkbox">
      <input {...field.props} id={id} checked={field.input === true} type="checkbox" value="true" />

      {/* Wrap content inside a div so links or icons don't get affected by the parent flexbox */}
      <div>{children}</div>
    </label>
  );
}
