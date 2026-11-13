// Node modules
import { Form, useForm, type SubmitHandler } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import Select from "components/select/Select";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import ChildTooltips from "./ChildTooltips";
import schema from "./schema";
import "./child-form.css";

interface Props {
  /** The position of the child in the household list, shown in the title as "Barn 1", "Barn 2", etc. */
  childNumber: number;

  /** Closes the sub-form without saving. Used by both the close icon and the "Avbryt" button. */
  onCancel?: () => void;

  /** Receives the validated child information when the user clicks "Spara". */
  onSave?: SubmitHandler<typeof schema>;
}

export default function ChildForm({ childNumber, onCancel, onSave = () => {} }: Props) {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Derived state
  const maxAge = 18;
  const ageRange = Array.from({ length: maxAge + 1 }, (_, age) => age);

  return (
    <Form of={form} onSubmit={onSave} className="child-form">
      <header>
        <h5>Barn {childNumber}</h5>
        <button aria-label={`Stäng barn ${childNumber}`} className="close" onClick={onCancel} type="button">
          <Icon name="x-mark" />
        </button>
      </header>

      <section className="content">
        <SelectGroup form={form} id="child_age">
          <Label>Barnets ålder</Label>
          <Select>Ange ålder</Select>
          {ageRange.map((age) => (
            <SelectOption key={age} value={age}>
              {age === 0 ? "Under 1 år" : `${age} år`}
            </SelectOption>
          ))}
        </SelectGroup>

        <div className="yes-no-questions">
          <RadioGroup form={form} tooltips={ChildTooltips} id="child_receives_allowance">
            <Label>Får du barnbidrag eller studiebidrag?</Label>
            <RadioOption value={true}>Ja</RadioOption>
            <RadioOption value={false}>Nej</RadioOption>
          </RadioGroup>

          <RadioGroup form={form} id="child_lives_with_applicant">
            <Label>Bor barnet hos dig?</Label>
            <RadioOption value={true}>Ja</RadioOption>
            <RadioOption value={false}>Nej</RadioOption>
          </RadioGroup>

          <RadioGroup form={form} id="child_shared_custody">
            <Label>Har du delad vårdnad?</Label>
            <RadioOption value={true}>Ja</RadioOption>
            <RadioOption value={false}>Nej</RadioOption>
          </RadioGroup>
        </div>

        <RadioGroup form={form} tooltips={ChildTooltips} id="child_maintenance">
          <Label>Betalar eller får du underhåll?</Label>
          <RadioOption value="pays">Betalar underhåll</RadioOption>
          <RadioOption value="receives">Får underhåll</RadioOption>
          <RadioOption value="none">Inget underhåll</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <footer>
        <Button variant="secondary" onClick={onCancel}>
          Avbryt
        </Button>
        <Button type="submit">Spara</Button>
      </footer>
    </Form>
  );
}
