// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore, type RequiredPath } from "@formisch/react";

// Project files
import Icon from "components/icon/Icon";
import getFieldPath from "helpers/getFieldPath";
import pathToId from "helpers/pathToId";
import "./styles/checkbox-design.css";
import "./styles/checkbox-layout.css";
import "./styles/checkbox-state.css";

interface Props {
  /** Unique identifier of a form field. */
  id?: string;

  /** Parent path of the field, only needed inside nested forms. Example: `["employees", 0]`. */
  path?: RequiredPath;

  /** The text to display next to the checkbox. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  form?: FormStore;
}

export default function Checkbox({ id, path, children, form }: Props) {
  // Safeguards
  if (!form) return <p>This component requires a Formisch form and id</p>;
  if (!id) return <p>Pass an id to know which field this input belongs</p>;

  // Local state
  const field = useField(form, { path: getFieldPath(id, path) as [string] });

  // Derived state
  const htmlId = pathToId(field.path);

  return (
    <label className="checkbox">
      <input {...field.props} id={htmlId} checked={field.input === true} type="checkbox" value="true" />

      {/* The icon we use to stylze the input, must go after the real <input> to appear on top */}
      <Icon name="check" />

      {/* Wrap content inside a div so links or icons don't get affected by the parent grid */}
      <div>{children}</div>
    </label>
  );
}
