// Node modules
import { Form, getInput, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import SelectorGroup from "components/selector-group/SelectorGroup";
import SelectorOption from "components/selector-option/SelectorOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import type { PropertyType } from "../types/PropertyType";
import requiresMonthlyFee from "./helpers/requiresMonthlyFee";
import requiresOperatingCost from "./helpers/requiresOperatingCost";
import Hints from "./Hints";
import buildSchema from "./schema";
import "./step-2.css";

interface Props {
  /** The kind of home property the user selected to tailor this step questions. */
  propertyType: PropertyType;

  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Step2({ propertyType, setStep }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();

  // Local state
  const form = useForm({
    schema: buildSchema(propertyType),
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application, treatZeroAsEmpty: true }),
  });

  // Derived state
  const isTerracedHouse = propertyType === "terraced_house";
  const tenancyType = isTerracedHouse ? getInput(form, { path: ["tenancy_type"] }) : undefined;
  const hasMonthlyFee = requiresMonthlyFee(propertyType, tenancyType);
  const hasOperatingCost = requiresOperatingCost(propertyType, tenancyType);

  // Methods
  function submitForm(values: object) {
    // The property's fee fields are mutually exclusive — reset both so only the
    // one the user actually filled in is sent to the backend, never both.
    updateApplication({ monthly_fee: 0, operating_cost: 0, ...values });
    setStep("success-step");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-2" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={() => setStep("step-1")} />
        <h4>2. Om bostaden</h4>
      </header>

      <section>
        {isTerracedHouse && (
          <SelectorGroup form={form} hints={Hints} id="tenancy_type">
            <Label>Vad har radhuset för upplåtelseform?</Label>
            <SelectorOption value="agreement">Bostadsrätt</SelectorOption>
            <SelectorOption value="ownership">Äganderätt</SelectorOption>
          </SelectorGroup>
        )}

        <InputField form={form} id="size">
          <Label>Kvadratmeter</Label>
          <Input type="number" suffix="kvm" />
        </InputField>

        <InputField form={form} hints={Hints} id="rooms">
          <Label>Antal rum</Label>
          <Input type="number" suffix="st" />
        </InputField>

        {hasMonthlyFee && (
          <InputField form={form} hints={Hints} id="monthly_fee">
            <Label>Månadsavgift</Label>
            <Input type="number" suffix="kr/mån" />
          </InputField>
        )}

        {hasOperatingCost && (
          <InputField form={form} hints={Hints} id="operating_cost">
            <Label>Driftskostnad</Label>
            <Input type="number" suffix="kr/mån" />
          </InputField>
        )}
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
