// Node modules
import { Form, getInput, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import Hints from "./Hints";
import schema from "./schema";

export default function Step4() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application, treatZeroAsEmpty: true }),
  });

  // Derived state
  const fieldExistingLoans = getInput(form, { path: ["has_existing_loans"] });
  const hasExistingLoans = Boolean(fieldExistingLoans === "true");

  // Methods
  function submitForm(values: object) {
    // loan_debt only applies when the company has existing loans — reset it so a
    // stale value isn't sent to the backend when the user answered "Nej".
    updateApplication({ loan_debt: 0, ...values });
    setStep("step-5");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h5>Omsättning</h5>
        <small>Nästa: Lånesyfte</small>
        <Icon name="hashtag" />
      </header>

      <hr />

      <section>
        <InputField form={form} hints={Hints} id="turnover">
          <Label>Bolagets omsättning från juni 2025 till idag</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <RadioGroup form={form} id="has_existing_loans">
          <Label>Har bolaget befintliga lån?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>

        {hasExistingLoans && (
          <InputField form={form} hints={Hints} id="loan_debt">
            <Label>Uppskattad total skuld på befintliga lån</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}
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
