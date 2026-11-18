// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore, type RequiredPath } from "@formisch/react";

// Project files
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectOption from "components/select-option/SelectOption";
import extractComponent from "helpers/extractComponent";
import extractOptions from "helpers/extractOptions";
import pathToId from "helpers/pathToId";
import "./select-group.css";

interface Props {
  /**  Content to display inside the select. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** Formisch path of the form field, like `["employees", 0, "employee_name"]`. Also used to create the DOM id. */
  path: RequiredPath;

  /** All the possible tooltips available in this form. */
  tooltips?: Record<string, ReactNode>;
}

export default function SelectGroup({ children, form, path, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and at least two SelectOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Local state
  const field = useField(form, { path });

  // Derived state
  const id = pathToId(path);
  const anchorId = `--anchor-${id}`; // Requires "--" to work properly.
  const listId = `list-${id}`;

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id, tooltip } });
  const selectOptions = extractOptions({ component: SelectOption, extractFrom: children, props: { id, field } });
  const activeOption = selectOptions.find((item) => String(item.props.value) === field.input);
  const activeText = activeOption && activeOption.props.children;
  const selectProps = { anchorId, activeText, form, path };
  const select = extractComponent({ component: Select, extractFrom: children, props: selectProps });

  return (
    <div className="select-group">
      {label}
      {select}
      <div id={listId} className="select-list" popover="auto" style={{ positionAnchor: anchorId }}>
        {selectOptions}
      </div>
    </div>
  );
}
