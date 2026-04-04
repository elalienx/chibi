// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";
import type { InferOutput } from "valibot";

// Project files
import Button from "../../../components/button/Button";
import Icon from "../../../components/icon/Icon";
import Input from "../../../components/input/Input";
import InputField from "../../../components/input-field/InputField";
import Label from "../../../components/label/Label";
import useFormStore from "../helpers/useFormStore";
import { monthly_fee, operating_cost, rooms, size } from "./schema";
import "./step-3.css";
import type { Step } from "../helpers/Step";

interface Props {
  setStep: (step: Step) => void;
}

export default function Step3({ setStep }: Props) {
  // Global state
  const { formStore, updateFormStore } = useFormStore();
  const schema = buildSchema();
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm(values: InferOutput<typeof schema>) {
    if (form.isValid) {
      updateFormStore(values);
      setStep("success");
    }
  }

  function buildSchema() {
    if (formStore.property_type === "apartment") {
      return v.object({ size, rooms, monthly_fee });
    } else {
      return v.object({ size, rooms, operating_cost });
    }
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-3" className="soft-background">
      <section className="top">
        <header>
          <button className="link-go-back" onClick={() => setStep("step2")}>
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

        {formStore.property_type === "apartment" && (
          <InputField form={form} id="monthly_fee">
            <Label>Månadsavgift</Label>
            <Input type="number" placeholder="0" suffix="kr/mån" />
          </InputField>
        )}

        {formStore.property_type !== "apartment" && (
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
