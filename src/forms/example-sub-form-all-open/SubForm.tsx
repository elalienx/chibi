// Node modules
import { useImperativeHandle, type Ref } from "react";
import { useForm, type FormStore } from "@formisch/react";

// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import { createSubFormSchema } from "./schema";
import "./sub-form-all-open.css";

interface Props {
  /** Stable number of this sub-form, used to make its field ids unique on the page. */
  id: number;

  /** The heading of the sub-form, also used in the delete button name. */
  title: string;

  /** Removes this sub-form from the list. */
  onDelete: () => void;

  /** Receives the Formisch form of this sub-form, so the parent can validate all sub-forms at once. */
  ref?: Ref<FormStore>;
}

export default function SubForm({ id, title, onDelete, ref }: Props) {
  // Local state
  const form = useForm({ schema: createSubFormSchema(id), validate: "blur", revalidate: "blur" });

  // Hands the form to the parent, which cannot reach it otherwise.
  useImperativeHandle(ref, () => form, [form]);

  return (
    <article className="sub-form-all-open">
      <header>
        <h5>{title}</h5>
        <ButtonIcon icon="trash-xmark" name={`Delete ${title}`} onClick={onDelete} variant="danger" />
      </header>

      <InputField form={form} id={`employee_name_${id}`}>
        <Label>Employee name</Label>
        <Input type="text" placeholder="Leif Lend" />
      </InputField>

      <ChipGroup form={form} id={`job_role_${id}`}>
        <Label>Job role</Label>
        <ChipOption value="developer">Developer</ChipOption>
        <ChipOption value="graphic_designer">Graphic designer</ChipOption>
        <ChipOption value="manager">Manager</ChipOption>
        <ChipOption value="product_owner">Product owner</ChipOption>
      </ChipGroup>
    </article>
  );
}
