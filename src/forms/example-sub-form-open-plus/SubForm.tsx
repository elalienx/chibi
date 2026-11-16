// Node modules
import { useForm } from "@formisch/react";

// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import { subFormSchema } from "./schema";
import "./sub-form-open-plus.css";

interface Props {
  /** The heading of the sub-form, also used in the delete button name. */
  title: string;

  /** Removes this sub-form from the list. */
  onDelete?: () => void;
}

export default function SubForm({ title, onDelete }: Props) {
  // Local state
  const form = useForm({ schema: subFormSchema, validate: "blur", revalidate: "blur" });

  return (
    <article className="sub-form-open-plus">
      <header>
        <h5>{title}</h5>
        <ButtonIcon icon="trash-xmark" name={`Delete ${title}`} onClick={onDelete} variant="danger" />
      </header>

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
    </article>
  );
}
