// Node modules
import { useImperativeHandle, type Ref } from "react";
import { handleSubmit, useForm } from "@formisch/react";

// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import ChipGroup from "components/chip-group/ChipGroup";
import ChipOption from "components/chip-option/ChipOption";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import { createSubFormSchema } from "./schema";
import "./sub-form-open.css";

interface Props {
  /** Stable number of this sub-form, used to make its field ids unique on the page. */
  id: number;

  /** The heading of the sub-form, also used in the delete button name. */
  title: string;

  /** Removes this sub-form from the list. */
  onDelete: () => void;

  /** Lets the parent validate this sub-form, e.g. before adding a new one. */
  ref?: Ref<SubFormHandle>;
}

export interface SubFormHandle {
  /** Shows the errors of this sub-form and resolves to true if it is valid. */
  validate: () => Promise<boolean>;
}

export default function SubForm({ id, title, onDelete, ref }: Props) {
  // Local state
  const form = useForm({ schema: createSubFormSchema(id), validate: "blur", revalidate: "blur" });

  // Methods
  async function validateForm() {
    let isValid = false;

    // Not Formisch's validate(): Chibi inputs only show their errors once the form is submitted.
    await handleSubmit(form, () => {
      isValid = true;
    })();

    return isValid;
  }

  // Exposes the validation to the parent, which cannot reach this form store otherwise.
  useImperativeHandle(ref, () => ({ validate: validateForm }));

  return (
    <article className="sub-form-open">
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
        <ChipOption value="maanger">Manager</ChipOption>
        <ChipOption value="product_owner">Product owner</ChipOption>
      </ChipGroup>
    </article>
  );
}
