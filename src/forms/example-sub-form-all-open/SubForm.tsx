// Node modules
import type { FormStore } from "@formisch/react";

// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import type { mainSchema } from "./schema";
import "./sub-form-all-open.css";

interface Props {
  /** The Formisch form of the parent page, which owns every employee. */
  form: FormStore<typeof mainSchema>;

  /** Position of this employee inside the form `employees` array. */
  index: number;

  /** The heading of the sub-form, also used in the delete button name. */
  title: string;

  /** Removes this sub-form from the list. */
  onDelete: () => void;
}

export default function SubForm({ form, index, title, onDelete }: Props) {
  return (
    <article className="sub-form-all-open">
      <header>
        <h5>{title}</h5>
        <ButtonIcon icon="trash-xmark" name={`Delete ${title}`} onClick={onDelete} variant="danger" />
      </header>

      <InputField form={form} path={["employees", index, "employee_name"]}>
        <Label>Employee name</Label>
        <Input type="text" placeholder="Leif Lend" />
      </InputField>

      <ChipGroup form={form} path={["employees", index, "job_role"]}>
        <Label>Job role</Label>
        <ChipOption value="developer">Developer</ChipOption>
        <ChipOption value="graphic_designer">Graphic designer</ChipOption>
        <ChipOption value="manager">Manager</ChipOption>
        <ChipOption value="product_owner">Product owner</ChipOption>
      </ChipGroup>
    </article>
  );
}
