// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import Select from "components/select/Select";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import purposes from "../data/purposes";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import Hints from "./Hints";
import schema from "./schema";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Step4({ setStep }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput(application, true),
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-5");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={() => setStep("step-3")} />
        <h4>Personuppgifter</h4>
      </header>

      <section>
        <SelectGroup form={form} id={"purpose"}>
          <Select>Välj</Select>
          {purposes.map((item) => (
            <SelectOption value={item.value}>{item.label}</SelectOption>
          ))}
        </SelectGroup>

        <InputField form={form} hints={Hints} id="turnover">
          <Label>Bolagets omsättning från juni 2025 till idag</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <RadioGroup form={form} id="has_existing_loans">
          <Label>Har bolaget befintliga lån?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>

        <InputField form={form} hints={Hints} id="loan_debt">
          <Label>Uppskattad total skuld på befintliga lån</Label>
          <Input type="number" suffix="kr" />
        </InputField>
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Fortsätt <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
