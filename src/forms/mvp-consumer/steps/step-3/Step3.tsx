// Node modules
import { Form, getInput, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import StepIndicator from "components/step-indicator/StepIndicator";
import Tooltip from "components/tooltip/Tooltip";
import cleanInitialInput from "helpers/cleanInitialInput";
import useModal from "state/useModal";
import ConsumerAgencyWarning from "../../components/ConsumerAgencyWarning";
import initialApplication from "../../data/initialApplication";
import useApplication from "../../state/useApplication";
import useFormNavigation from "../../state/useFormNavigation";
import type Application from "../../types/Application";
import ApplicantHeader from "./components/MainApplicantHeader";
import CoApplicantFields from "./components/CoApplicantFields";
import CoApplicantHeader from "./components/CoApplicantHeader";
import MainApplicantFields from "./components/MainApplicantFields";
import RemoveCoApplicantModal from "./components/RemoveCoApplicantModal";
import buildSchema from "./schema";
import Tooltips from "./Tooltips";
import "./step-3.css";

interface Props {
  /** Shows the co-applicant fields when the user answered "Ja" in Step 2. */
  hasCoApplicant: boolean;
}

export default function Step3({ hasCoApplicant }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();
  const { setModal, closeModal } = useModal.getState();

  // Local state
  const form = useForm({
    schema: buildSchema(hasCoApplicant),
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function resetCoApplicant() {
    const coApplicantEntries = Object.entries(initialApplication).filter(([key]) => key.startsWith("co_"));

    return Object.fromEntries(coApplicantEntries) as Partial<Application>;
  }

  function submitForm(values: object) {
    if (hasCoApplicant) updateApplication(values);
    if (!hasCoApplicant) updateApplication({ ...values, ...resetCoApplicant() });

    setStep("success-step");
  }

  function removeCoApplicant() {
    const keepMainApplicant = getInput(form) as Partial<Application>;
    const removeCoApplicant = resetCoApplicant();

    updateApplication({ ...keepMainApplicant, ...removeCoApplicant, has_co_applicant: false });
    closeModal();
  }

  // Components
  const removeCoApplicantModal = <RemoveCoApplicantModal onClose={closeModal} onRemove={removeCoApplicant} />;

  return (
    <Form of={form} onSubmit={submitForm} className="consumer-form" id="step-3">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Personuppgifter</h4>
        <small>Nästa: Bostad & Arbete</small>
        <StepIndicator currentStep={3} totalSteps={5} />
      </header>

      <hr />

      {/* Applicant */}
      <section>
        {hasCoApplicant && <ApplicantHeader />}
        <MainApplicantFields form={form} />
      </section>

      {hasCoApplicant && <hr className="applicant-divider" />}

      {/* Co-applicant */}
      {hasCoApplicant && (
        <section>
          <CoApplicantHeader onRemove={() => setModal(removeCoApplicantModal)} />
          <CoApplicantFields form={form} />
        </section>
      )}

      <hr />

      <footer>
        <small>
          Varför ber vi om BankID-identifiering? <Tooltip>{Tooltips.bank_id}</Tooltip>
        </small>
        <Button type="submit">
          Fortsätt med BankID
          <Icon name="bankid" />
        </Button>
      </footer>

      <ConsumerAgencyWarning />
    </Form>
  );
}
