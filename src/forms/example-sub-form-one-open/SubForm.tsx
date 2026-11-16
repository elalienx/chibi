// Node modules
import { handleSubmit, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import cleanInitialInput from "helpers/cleanInitialInput";
import { subFormSchema, type Item } from "./schema";
import "./sub-form-one-open.css";

interface Props {
  /** The saved item to edit. Leave empty to add a new item. */
  item?: Item;

  /** Closes the sub-form without saving. */
  onCancel: () => void;

  /** Receives the validated item when the user clicks "Save". */
  onSave: (item: Item) => void;
}

export default function SubForm({ item, onCancel, onSave }: Props) {
  // Local state
  const form = useForm({
    schema: subFormSchema,
    validate: "blur",
    revalidate: "blur",
    initialInput: item && cleanInitialInput({ input: item }),
  });

  return (
    <div className="sub-form-one-open">
      <InputField form={form} id="employee_name">
        <Label>Employee name</Label>
        <Input type="text" placeholder="Leif Lend" />
      </InputField>

      <ChipGroup form={form} id="job_role">
        <Label>Job role</Label>
        <ChipOption value="developer">Developer</ChipOption>
        <ChipOption value="graphic_designer">Graphic designer</ChipOption>
        <ChipOption value="maanger">Manager</ChipOption>
        <ChipOption value="product_owner">Product owner</ChipOption>
      </ChipGroup>

      <footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>

        {/* Not a submit button: this sub-form lives inside the parent form, and HTML forms cannot be nested. */}
        <Button variant="primary" onClick={handleSubmit(form, onSave)}>
          Save
        </Button>
      </footer>
    </div>
  );
}
