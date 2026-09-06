// Node modules
import { Form, getInput, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import ToggleGroup from "components/toggle-group/ToggleGroup";
import ToggleOption from "components/toggle-option/ToggleOption";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import type { PropertyType } from "../types/PropertyType";
import requiresMonthlyFee from "./helpers/requiresMonthlyFee";
import requiresOperatingCost from "./helpers/requiresOperatingCost";
import Hints from "./Hints";
import buildSchema from "./schema";
import "./step-2.css";

interface Props {
  /** The kind of home property the user selected to tailor this step questions. */
  propertyType: PropertyType;
}

export default function Step2({ propertyType }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

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
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>2. Om bostaden</h4>
      </header>

      <section>
        {isTerracedHouse && (
          <ToggleGroup form={form} hints={Hints} id="tenancy_type">
            <Label>Vad har radhuset för upplåtelseform?</Label>
            <ToggleOption value="agreement">Bostadsrätt</ToggleOption>
            <ToggleOption value="ownership">Äganderätt</ToggleOption>
          </ToggleGroup>
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
