// Node modules
import { Form, useForm } from "@formisch/react";

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
import civilStatuses from "../data/civilStatuses";
import employmentTypes from "../data/employmentTypes";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import Tooltips from "./Tooltips";
import "./step-3.css";

export default function Step3() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { ...cleanInitialInput({ input: application }), is_not_pep: true },
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("success-step");
  }

  // Components
  const PEPInfo = (
    <a href="#" target="_blank">
      Klicka här
    </a>
  );

  return (
    <Form of={form} onSubmit={submitForm} id="step-3" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>3. Dina personuppgifter</h4>
      </header>

      <section>
        <SelectGroup form={form} id="civil_status">
          <Label>Civilstånd</Label>
          <Select>Ange civilstånd</Select>
          {civilStatuses.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <InputField form={form} id="email">
          <Label>E-postadress</Label>
          <Input type="email" placeholder="namn@email.se" />
        </InputField>

        <InputField form={form} id="phone">
          <Label>Mobilnummer</Label>
          <Input type="tel" placeholder="+46 XX XXX XX XX" />
        </InputField>

        <SelectGroup form={form} tooltips={Tooltips} id="employment_type">
          <Label>Anställningsform</Label>
          <Select>Ange anställningsform</Select>
          {employmentTypes.map(({ label, value }) => (
            <SelectOption key={value} value={value}>
              {label}
            </SelectOption>
          ))}
        </SelectGroup>

        <ToggleGroup form={form} tooltips={Tooltips} id="has_co_applicant">
          <Label>Har du en medsökande?</Label>
          <ToggleOption value={true}>Ja</ToggleOption>
          <ToggleOption value={false}>Nej</ToggleOption>
        </ToggleGroup>
      </section>

      <hr />

      <section className="pep">
        <Checkbox form={form} id="is_not_pep">
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
