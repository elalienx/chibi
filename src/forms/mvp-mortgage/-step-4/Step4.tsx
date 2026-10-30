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
import cleanInitialInput from "helpers/cleanInitialInput";
import useModal from "state/useModal";
import civilStatuses from "../data/civilStatuses";
import employmentTypes from "../data/employmentTypes";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import PEPInfoModal from "./components/PEPInfoModal";
import PEPWarningModalCoApplicant from "./components/PEPWarningModalCoApplicant";
import schema from "./schema";
import "./step-4.css";

export default function Step4() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();
  const { setModal, closeModal } = useModal.getState();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { ...cleanInitialInput({ input: application }), co_claims_pep: !application.co_claims_pep }, // The checkbox shows the opposite, see schema
  });

  // Derived state
  const ssnTooltip = `Vi behöver din medsökandes personnummer för att behandla er ansökan och erbjuda det bästa låneerbjudandet för er.`;
  const employmentTooltip = `Är du över 65 år? För att du ska få korrekta erbjudanden är det viktigt att du anger pension som anställningsform, trots att du fortfarande arbetar just nu.`;

  // Methods
  function submitForm(values: v.InferOutput<typeof schema>) {
    // PEP co-applicants can still apply, but we warn them first.
    if (values.co_claims_pep) {
      setModal(<PEPWarningModalCoApplicant onClose={closeModal} onContinue={() => continueAsPEP(values)} />);
      return;
    }

    updateApplication(values);
    setStep("step-5");
  }

  function continueAsPEP(values: v.InferOutput<typeof schema>) {
    closeModal();
    updateApplication(values);
    setStep("step-5");
  }

  // Components
  const PEPInfo = (
    <button type="button" className="pep-info" onClick={() => setModal(<PEPInfoModal onClose={closeModal} />)}>
      Klicka här
    </button>
  );

  return (
    <Form of={form} onSubmit={submitForm} id="step-4" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>4. Medsökandes personuppgifter</h4>
      </header>

      <section>
        <SelectGroup form={form} id="co_relationship_with_main_applicant">
          <Label>Vad har du för relation till din medsökande?</Label>
          <Select>Ange relation</Select>
          <SelectOption value="married">Make/Maka</SelectOption>
          <SelectOption value="parent">Förälder</SelectOption>
          <SelectOption value="child">Barn</SelectOption>
          <SelectOption value="other">Annan relation</SelectOption>
        </SelectGroup>

        <InputField form={form} id="co_ssn">
          <Label tooltip={ssnTooltip}>Medsökandes personnummer</Label>
          <Input type="text" placeholder="ÅÅÅÅMMDDXXXX" />
        </InputField>

        <SelectGroup form={form} id="co_civil_state">
          <Label>Medsökandes civilstånd</Label>
          <Select>Ange civilstånd</Select>
          {civilStatuses.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <InputField form={form} id="co_email">
          <Label>Medsökandes e-post</Label>
          <Input type="email" placeholder="namn@email.se" />
        </InputField>

        <InputField form={form} id="co_phone">
          <Label>Medsökandes mobilnummer</Label>
          <Input type="tel" placeholder="+46 XX XXX XX XX" />
        </InputField>

        <SelectGroup form={form} id="co_employment_type">
          <Label tooltip={employmentTooltip}>Medsökandes anställningsform</Label>
          <Select>Ange anställningsform</Select>
          {employmentTypes.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>
      </section>

      <hr />

      <section className="pep">
        <Checkbox form={form} id="co_claims_pep">
          Jag intygar att min medsökande INTE är en person i politisk utsatt ställning (PEP).
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
