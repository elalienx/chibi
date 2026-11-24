// Node modules
import type { FormStore } from "@formisch/react";

// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import Select from "components/select/Select";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import Tooltips from "../../../step-7/Tooltips";
import type schemaChildren from "../../schema";
import "./child-sub-form.css";

interface Props {
  /** The children form this sub-form belongs to. */
  form: FormStore<typeof schemaChildren>;

  /** Position of this child in the form, used in the path of each field. */
  index: number;

  /** The position of the child in the household list, shown in the title as "Barn 1", "Barn 2", etc. */
  childNumber: number;

  /** Removes this child from the list. */
  onDelete: () => void;
}

export default function ChildSubForm({ form, index, childNumber, onDelete }: Props) {
  // Derived state
  const maxAge = 18;
  const ageRange = Array.from({ length: maxAge + 1 }, (_, age) => age);

  return (
    <article className="child-sub-form">
      <header>
        <h5>Barn {childNumber}</h5>
        <ButtonIcon icon="trash-xmark" name={`Ta bort barn ${childNumber}`} onClick={onDelete} variant="danger" />
      </header>

      <SelectGroup form={form} id={["household_children", index, "child_age"]}>
        <Label>Barnets ålder</Label>
        <Select>Ange ålder</Select>
        {ageRange.map((age) => (
          <SelectOption key={age} value={age}>
            {age === 0 ? "Under 1 år" : `${age} år`}
          </SelectOption>
        ))}
      </SelectGroup>

      <div className="yes-no-questions">
        <RadioGroup form={form} tooltips={Tooltips} id={["household_children", index, "child_receives_allowance"]}>
          <Label>Får du barnbidrag eller studiebidrag?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>

        <RadioGroup form={form} id={["household_children", index, "child_lives_with_applicant"]}>
          <Label>Bor barnet hos dig?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>

        <RadioGroup form={form} id={["household_children", index, "child_shared_custody"]}>
          <Label>Har du delad vårdnad?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>
      </div>

      <RadioGroup form={form} tooltips={Tooltips} id={["household_children", index, "child_maintenance"]}>
        <Label>Betalar eller får du underhåll?</Label>
        <RadioOption value="pays">Betalar underhåll</RadioOption>
        <RadioOption value="receives">Får underhåll</RadioOption>
        <RadioOption value="none">Inget underhåll</RadioOption>
      </RadioGroup>
    </article>
  );
}
