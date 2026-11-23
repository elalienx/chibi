// Node modules
import type { FormStore } from "@formisch/react";

// Project files
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import childrenUnder21 from "../../../data/childrenUnder21";
import civilStatuses from "../../../data/civilStatuses";
import Tooltips from "../Tooltips";

interface Props {
  /** An instance of a Formisch form. */
  form: FormStore;
}

/**
 * The fields of the main applicant in Step 3.
 */
export default function MainApplicantFields({ form }: Props) {
  return (
    <>
      <InputField form={form} id={["main_email"]}>
        <Label>E-postadress</Label>
        <Input type="email" placeholder="namn@email.com" />
      </InputField>

      <InputField form={form} id={["main_phone"]}>
        <Label>Mobilnummer</Label>
        <Input type="tel" />
      </InputField>

      <div className="columns">
        <SelectGroup form={form} id={["main_civil_state"]}>
          <Label>Civilstatus</Label>
          <Select>Välj</Select>
          {civilStatuses.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <SelectGroup form={form} tooltips={Tooltips} id={["main_children_under_21"]}>
          <Label>Barn under 21 år</Label>
          <Select>Välj</Select>
          {childrenUnder21.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>
      </div>
    </>
  );
}
