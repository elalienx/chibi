// Node modules
import type { ReactNode } from "react";
import { useField, type FormStore } from "@formisch/react";

// Project files
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectOption from "components/select-option/SelectOption";
import extractComponent from "helpers/extractComponent";
import extractOptions from "helpers/extractOptions";
import "./select-group.css";

interface Props {
  /** Unique identifier of the parent input group to make sure only one select option is active. */
  id: string;

  /** Parent path of the field, only needed inside nested forms. Example: `["employees", 0]`. */
  path?: readonly (string | number)[];

  /**  Content to display inside the select. */
  children?: ReactNode;

  /** An instance of a Formisch form. */
  form: FormStore;

  /** All the possible tooltips available in this form. */
  tooltips?: Record<string, ReactNode>;
}

export default function SelectGroup({ id, path = [], children, form, tooltips }: Props) {
  // Safeguards
  if (!children) return <p>Please add a Label and at least two SelectOption to get started</p>;
  if (!form) return <p>Please add a Formisch form to get started</p>;

  // Local state
  const field = useField(form, { path: [...path, id] as [string] });

  // Derived state
  const htmlId = [...path, id].join(".");
  const anchorId = `--anchor-${htmlId}`; // Requires "--" to work properly.
  const listId = `list-${htmlId}`;

  // Components
  const tooltip = tooltips?.[id];
  const label = extractComponent({ component: Label, extractFrom: children, props: { id: htmlId, tooltip } });
  const selectOptions = extractOptions({
    component: SelectOption,
    extractFrom: children,
    props: { id: htmlId, field },
  });
  const activeOption = selectOptions.find((item) => String(item.props.value) === field.input);
  const activeText = activeOption && activeOption.props.children;
  const selectProps = { id, path, anchorId, activeText, form };
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
