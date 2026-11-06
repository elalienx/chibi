// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import StepIndicator from "components/step-indicator/StepIndicator";
import cleanInitialInput from "helpers/cleanInitialInput";
import ConsumerAgencyWarning from "../components/ConsumerAgencyWarning";
import initialApplication from "../data/initialApplication";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import type Application from "../types/Application";
import ApplicantFields from "./components/ApplicantFields";
import buildSchema from "./schema";
import "./step-3.css";

interface Props {
  /** Shows the co-applicant fields when the user answered "Ja" in Step 2. */
  hasCoApplicant: boolean;
}

export default function Step3({ hasCoApplicant }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: buildSchema(hasCoApplicant),
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function submitForm(values: object) {
    // Without a co-applicant, clear any co-applicant data saved on a previous visit.
    const coApplicantEntries = Object.entries(initialApplication).filter(([key]) => key.startsWith("co_"));
    const coApplicantReset = Object.fromEntries(coApplicantEntries) as Partial<Application>;
    const newValues = hasCoApplicant ? values : { ...coApplicantReset, ...values };

    updateApplication(newValues);
    setStep("step-4");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="consumer-form" id="step-3">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Personuppgifter</h4>
        <small>Nästa: Bostad & Arbete</small>
        <StepIndicator currentStep={3} totalSteps={5} />
      </header>

      <hr />

      <section>
        {hasCoApplicant && (
          <h5>
            <Icon name="user" /> Dina uppgifter
          </h5>
        )}
        <ApplicantFields form={form} prefix="main" />
      </section>

      {hasCoApplicant && (
        <>
          <hr className="applicant-divider" />

          <section>
            <h5>
              <Icon name="user-group-simple" /> Din medsökande
            </h5>
            <ApplicantFields form={form} prefix="co" />
          </section>
        </>
      )}

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
