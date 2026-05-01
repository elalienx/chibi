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
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import type { PropertyType } from "../types/PropertyType";
import requiresMonthlyFee from "./requiresMonthlyFee";
import requiresOperatingCost from "./requiresOperatingCost";
import getSchema from "./schema";
import "./step-2.css";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;

  /** The kind of home property the user selected to tailor this step questions. */
  propertyType: PropertyType;
}

export default function Step2({ setStep, propertyType }: Props) {
  // Global state
  const { updateApplication } = useApplication();

  // Local state
  const form = useForm({ schema: getSchema(propertyType), validate: "blur", revalidate: "blur" });

  // Properties
  const isTerracedHouse = propertyType === "terraced_house";
  const tenancyType = isTerracedHouse ? getInput(form, { path: ["tenancy_type"] }) : undefined;
  const hasMonthlyFee = requiresMonthlyFee(propertyType, tenancyType);
  const hasOperatingCost = requiresOperatingCost(propertyType, tenancyType);

  // Methods
  function submitForm(values: object) {
    if (form.isValid) {
      updateApplication(values);
      setStep("success");
    }
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-2" className="soft-background">
      <section className="top">
        <header>
          <ArrowGoBack onClick={() => setStep("step-1")} />
          <h4>2. Om bostaden</h4>
        </header>

        {isTerracedHouse && (
          <RadioGroup form={form} id="tenancy_type">
            <Label>Vad har radhuset för upplåtelseform?</Label>
            <RadioOption value="agreement">Bostadsrätt</RadioOption>
            <RadioOption value="ownership">Äganderätt</RadioOption>
          </RadioGroup>
        )}

        <InputField form={form} id="size">
          <Label>Kvadratmeter</Label>
          <Input type="number" placeholder="0" suffix="kvm" />
        </InputField>

        <InputField form={form} id="rooms">
          <Label>Antal rum</Label>
          <Input type="number" placeholder="0" suffix="st" />
        </InputField>

        {hasMonthlyFee && (
          <InputField form={form} id="monthly_fee">
            <Label>Månadsavgift</Label>
            <Input type="number" placeholder="0" suffix="kr/mån" />
          </InputField>
        )}

        {hasOperatingCost && (
          <InputField form={form} id="operating_cost">
            <Label>Driftskostnad</Label>
            <Input type="number" placeholder="0" suffix="kr/mån" />
          </InputField>
        )}
      </section>

      <hr />

      <section className="bottom">
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </section>
    </Form>
  );
}
