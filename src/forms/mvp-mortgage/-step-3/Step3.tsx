// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Checkbox from "components/checkbox/Checkbox";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import ToggleGroup from "components/toggle-group/ToggleGroup";
import ToggleOption from "components/toggle-option/ToggleOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import useModal from "state/useModal";
import civilStatuses from "../data/civilStatuses";
import employmentTypes from "../data/employmentTypes";
import initialApplication from "../data/initialApplication";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import type Application from "../types/Application";
import type { Step } from "../types/Step";
import PEPInfoModal from "./components/PEPInfoModal";
import PEPWarningModal from "./components/PEPWarningModal";
import schema from "./schema";
import "./step-3.css";

// Properties
const coApplicantEntries = Object.entries(initialApplication).filter(([key]) => key.startsWith("co_"));
const coApplicantReset = Object.fromEntries(coApplicantEntries) as Partial<Application>;

export default function Step3() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();
  const { setModal, closeModal } = useModal.getState();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { ...cleanInitialInput({ input: application }), main_claims_pep: !application.main_claims_pep }, // The checkbox shows the opposite, see schema
  });

  // Derived state
  const employmentTooltip = `Är du över 65 år? För att du ska få korrekta erbjudanden är det viktigt att du anger pension som anställningsform, trots att du fortfarande arbetar just nu.`;
  const coApplicantTooltip = `Medsökande är en person som står tillsammans med dig på lånet, kan exempelvis vara en sambo eller annan familjemedlem.`;

  // Methods
  function submitForm(values: v.InferOutput<typeof schema>) {
    // Without a co-applicant we skip Step 4 and 6, so clear any co-applicant data saved on a previous visit.
    const updates = values.has_co_applicant ? values : { ...coApplicantReset, ...values };
    const nextStep = values.has_co_applicant ? "step-4" : "step-5";

    // PEP users can still apply, but we warn them first.
    if (values.main_claims_pep) {
      setModal(<PEPWarningModal onClose={closeModal} onContinue={() => continueAsPEP(updates, nextStep)} />);
      return;
    }

    updateApplication(updates);
    setStep(nextStep);
  }

  function continueAsPEP(updates: Partial<Application>, nextStep: Step) {
    closeModal();
    updateApplication(updates);
    setStep(nextStep);
  }

  // Components
  const PEPInfo = (
    <button type="button" className="pep-info" onClick={() => setModal(<PEPInfoModal onClose={closeModal} />)}>
      Klicka här
    </button>
  );

  return (
    <Form of={form} onSubmit={submitForm} id="step-3" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>3. Dina personuppgifter</h4>
      </header>

      <section>
        <SelectGroup form={form} id="main_civil_state">
          <Label>Civilstånd</Label>
          <Select>Ange civilstånd</Select>
          {civilStatuses.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <InputField form={form} id="main_email">
          <Label>E-postadress</Label>
          <Input type="email" placeholder="namn@email.se" />
        </InputField>

        <InputField form={form} id="main_phone">
          <Label>Mobilnummer</Label>
          <Input type="tel" placeholder="+46 XX XXX XX XX" />
        </InputField>

        <SelectGroup form={form} id="main_employment_type">
          <Label tooltip={employmentTooltip}>Anställningsform</Label>
          <Select>Ange anställningsform</Select>
          {employmentTypes.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <ToggleGroup form={form} id="has_co_applicant">
          <Label tooltip={coApplicantTooltip}>Har du en medsökande?</Label>
          <ToggleOption value={true}>Ja</ToggleOption>
          <ToggleOption value={false}>Nej</ToggleOption>
        </ToggleGroup>
      </section>

      <hr />

      <section className="pep">
        <Checkbox form={form} id="main_claims_pep">
          Jag intygar att jag INTE är en person i politisk utsatt ställning (PEP).
        </Checkbox>
        <small>
          En person i politisk utsatt ställning, PEP, har eller har haft en högre politisk post eller statlig
          befattning. Om du är nära medarbetare eller familjemedlem till en sådan person ska du också bocka ur rutan
          ovan.
          <br />
          Vill du veta mer? {PEPInfo}
        </small>
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
