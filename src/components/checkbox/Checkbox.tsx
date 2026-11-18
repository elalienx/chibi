// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore, type RequiredPath } from "@formisch/react";

// Project files
import Icon from "components/icon/Icon";
import pathToId from "helpers/pathToId";
import "./styles/checkbox-design.css";
import "./styles/checkbox-layout.css";
import "./styles/checkbox-state.css";

interface Props {
  /** Unique identifier of a form field. */
  id?: RequiredPath;

  /** The text to display next to the checkbox. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  form?: FormStore;
}

export default function Checkbox({ id: path, children, form }: Props) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!path) return <p>Pass an id to know which field this input belongs</p>;

  // Local state
  const field = useField(form, { path: path as [string] }); // Components receive an untyped form, so Formisch can only validate paths with one key.

  // Derived state
  const id = pathToId(path);

  return (
    <label className="checkbox">
      <input {...field.props} id={id} checked={field.input === true} type="checkbox" value="true" />

      {/* The icon we use to stylze the input, must go after the real <input> to appear on top */}
      <Icon name="check" />

      {/* Wrap content inside a div so links or icons don't get affected by the parent grid */}
      <div>{children}</div>
    </label>
  );
}
