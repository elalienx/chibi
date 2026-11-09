// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Label from "components/label/Label";
import StepIndicator from "components/step-indicator/StepIndicator";
import ToggleGroup from "components/toggle-group/ToggleGroup";
import ToggleOption from "components/toggle-option/ToggleOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import ConsumerAgencyWarning from "../../components/ConsumerAgencyWarning";
import useApplication from "../../state/useApplication";
import useFormNavigation from "../../state/useFormNavigation";
import CoApplicantTooltip from "./CoApplicantTooltip";
import schema from "./schema";
import "./step-2.css";

export default function Step2() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function submitForm(values: v.InferOutput<typeof schema>) {
    updateApplication(values);
    setStep("step-3");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="consumer-form" id="step-2">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Medsökande</h4>
        <small>Nästa: Personuppgifter</small>
        <StepIndicator currentStep={2} totalSteps={5} />
      </header>

      <hr />

      <section>
        <ToggleGroup form={form} id="has_co_applicant">
          <Label tooltip={CoApplicantTooltip}>Vill du lägga till en medsökande?</Label>
          <ToggleOption value={true}>Ja</ToggleOption>
          <ToggleOption value={false}>Nej</ToggleOption>
        </ToggleGroup>
      </section>

      <hr />

      <footer>
        <Button variant="secondary" onClick={goPreviousStep}>
          <Icon name="arrow-left" /> Tillbaka
        </Button>
        <Button type="submit">
          Fortsätt <Icon name="arrow-right" />
        </Button>
      </footer>

      <ConsumerAgencyWarning />
    </Form>
  );
}
