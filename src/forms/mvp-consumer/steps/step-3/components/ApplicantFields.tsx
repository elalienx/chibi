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

  /** Decides if the fields belong to the main applicant or the co-applicant. */
  prefix: "main" | "co";
}

/**
 * The same group of fields is used for the main applicant and the co-applicant in Step 3.
 */
export default function ApplicantFields({ form, prefix }: Props) {
  return (
    <>
      <InputField form={form} id={`${prefix}_email`}>
        <Label>E-postadress</Label>
        <Input type="email" placeholder="namn@email.com" />
      </InputField>

      <InputField form={form} id={`${prefix}_phone`}>
        <Label>Mobilnummer</Label>
        <Input type="tel" placeholder="070XXXXXXX" />
      </InputField>

      <InputField form={form} tooltips={Tooltips} id={`${prefix}_ssn`}>
        <Label>Personnummer</Label>
        <Input type="text" placeholder="ÅÅÅÅMMDDXXXX" />
      </InputField>

      <div className="civil-state-and-children">
        <SelectGroup form={form} id={`${prefix}_civil_state`}>
          <Label>Civilstatus</Label>
          <Select>Välj</Select>
          {civilStatuses.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <SelectGroup form={form} tooltips={Tooltips} id={`${prefix}_children_under_21`}>
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
