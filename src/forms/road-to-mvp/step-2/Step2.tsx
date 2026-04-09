// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import useLoanApplication from "../helpers/useLoanApplication";
import type { Step } from "../types/Step";
import getSchema from "./schema";
import "./step-2.css";

interface Props {
  setStep: (step: Step) => void;

  /** Check whether the user selected an apartment to tailor the questions in this step. */
  isApartment: boolean;
}

export default function Step2({ setStep, isApartment }: Props) {
  // Global state
  const { updateLoanApplication } = useLoanApplication();

  // Local state
  const form = useForm({ schema: getSchema(isApartment), validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm(values: object) {
    if (form.isValid) {
      updateLoanApplication(values);
      setStep("success");
    }
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-2" className="soft-background">
      <section className="top">
        <header>
          <button className="go-back" onClick={() => setStep("step-1")} type="button">
            <Icon name="arrow-left" /> Tillbaka
          </button>
          <h4>2. Om bostaden</h4>
        </header>

        <InputField form={form} id="size">
          <Label>Kvadratmeter</Label>
          <Input type="number" placeholder="0" suffix="kvm" />
        </InputField>

        <InputField form={form} id="rooms">
          <Label>Antal rum</Label>
          <Input type="number" placeholder="0" suffix="st" />
        </InputField>

        {isApartment && (
          <InputField form={form} id="monthly_fee">
            <Label>Månadsavgift</Label>
            <Input type="number" placeholder="0" suffix="kr/mån" />
          </InputField>
        )}

        {!isApartment && (
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
