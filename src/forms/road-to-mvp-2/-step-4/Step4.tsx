// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import InputField from "components/input-field/InputField";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import schema from "./schema";
import cleanInitialInput from "helpers/cleanInitialInput";
import SelectGroup from "components/select-group/SelectGroup";
import loanPurposes from "../data/loanPurposes";
import SelectOption from "components/select-option/SelectOption";
import Select from "components/select/Select";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";

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
    initialInput: cleanInitialInput(application),
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-5");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form" id="step-1">
      <header>
        <ArrowGoBack hideLabel onClick={() => setStep("intro-step")} />
        <h4>Personuppgifter</h4>
      </header>

      <section>
        <SelectGroup form={form} id={"loan_purpose"}>
          <Select>Välj</Select>
          {loanPurposes.map((item) => (
            <SelectOption value={item.value}>{item.label}</SelectOption>
          ))}
        </SelectGroup>

        <InputField form={form} id="last_year_turnover">
          <Label>Bolagets omsättning från juni 2025 till idag</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <RadioGroup form={form} id="has_existing_loans">
          <Label>Har bolaget befintliga lån?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>

        <InputField form={form} id="loan_debt">
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
