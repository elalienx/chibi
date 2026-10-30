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
import StepIndicator from "components/step-indicator/StepIndicator";
import cleanInitialInput from "helpers/cleanInitialInput";
import exampleSSNs from "../-bank-id-login/exampleSSNs";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import Tooltips from "./Tooltips";

// Properties
const { SINGLE_PUBLIC_COMPANY, SOLE_TRADER } = exampleSSNs;

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
  const today = new Date();
  const oneYearAgo = new Date(today.getFullYear() - 1, today.getMonth(), 1);
  const startMonthAndYear = oneYearAgo.toLocaleDateString("sv-SE", { month: "long", year: "numeric" });
  const fieldExistingLoans = getInput(form, { path: ["has_existing_loans"] });
  const hasExistingLoans = Boolean(fieldExistingLoans === "true");
  const skippedCompanySelector = [SINGLE_PUBLIC_COMPANY, SOLE_TRADER].includes(application.ssn);
  const currentStep = skippedCompanySelector ? 3 : 4;
  const totalSteps = skippedCompanySelector ? 5 : 6;

  // Methods
  function submitForm(values: object) {
    // loan_debt only applies when the company has existing loans.
    // Reset it so a stale value is not sent to the backend when the user chooses "No".
    updateApplication({ loan_debt: 0, ...values });
    setStep("step-5");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Omsättning</h4>
        <small>Nästa: Lånesyfte</small>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </header>

      <hr />

      <section>
        <InputField form={form} tooltips={Tooltips} id="turnover">
          <Label>Bolagets omsättning från {startMonthAndYear} till idag</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <RadioGroup form={form} id="has_existing_loans">
          <Label>Har bolaget befintliga lån?</Label>
          <RadioOption value={true}>Ja</RadioOption>
          <RadioOption value={false}>Nej</RadioOption>
        </RadioGroup>

        {hasExistingLoans && (
          <InputField form={form} tooltips={Tooltips} id="loan_debt">
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
