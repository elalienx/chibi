// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import SelectorGroup from "components/selector-group/SelectorGroup";
import SelectorOption from "components/selector-option/SelectorOption";
import useApplication from "../state/useApplication";
import type { Step } from "../types/Step";
import type { PropertyType } from "../types/PropertyType";
import checkTenacyType from "./helpers/checkTenancyType";
import requiresMonthlyFee from "./helpers/requiresMonthlyFee";
import requiresOperatingCost from "./helpers/requiresOperatingCost";
import Hints from "./Hints";
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
  const form = useForm({
    schema: getSchema(propertyType),
    validate: "blur",
    revalidate: "blur",
    initialInput: { tenancy_type: "ownership" },
  });

  // Properties
  const isTerracedHouse = propertyType === "terraced_house";
  const tenancyType = checkTenacyType(isTerracedHouse, form);
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
          <SelectorGroup form={form} hints={Hints} id="tenancy_type">
            <Label tooltip={Hints["tenancy_type"]}>Vad har radhuset för upplåtelseform?</Label>
            <SelectorOption value="agreement">Bostadsrätt</SelectorOption>
            <SelectorOption value="ownership">Äganderätt</SelectorOption>
          </SelectorGroup>
        )}

        <InputField form={form} id="size">
          <Label>Kvadratmeter</Label>
          <Input type="number" placeholder="0" suffix="kvm" />
        </InputField>

        <InputField form={form} hints={Hints} id="rooms">
          <Label tooltip={Hints["rooms"]}>Antal rum</Label>
          <Input type="number" placeholder="0" suffix="st" />
        </InputField>

        {hasMonthlyFee && (
          <InputField form={form} hints={Hints} id="monthly_fee">
            <Label tooltip={Hints["monthly_fee"]}>Månadsavgift</Label>
            <Input type="number" placeholder="0" suffix="kr/mån" />
          </InputField>
        )}

        {hasOperatingCost && (
          <InputField form={form} hints={Hints} id="operating_cost">
            <Label tooltip={Hints["operating_cost"]}>Driftskostnad</Label>
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
