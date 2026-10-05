// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Slider from "components/slider/Slider";

const schema = v.object({
  loan_amount: v.pipe(
    v.string(),
    v.nonEmpty("Please enter a loan amount."),
    v.toNumber("Loan amount must be a valid number."),
  ),
  loan_period: v.pipe(
    v.string(),
    v.nonEmpty("Please choose a loan period."),
    v.toNumber("Loan period must be a valid number."),
  ),
});

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { loan_amount: "640000", loan_period: "5" },
  });
  const [formResult, setFormResult] = useState("On standby");

  // Methods
  function submitForm(values: v.InferOutput<typeof schema>) {
    alert("Success");
    setFormResult(`${values.loan_amount} kr over ${values.loan_period} years`);
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Slider tests</h4>
      </header>

      <section>
        <Slider form={form} id="loan_period" min={1} max={30} />

        <InputField form={form} id="loan_amount">
          <Label>Loan amount</Label>
          <Input type="number" suffix="kr" min={50_000} max={3_000_000} />
        </InputField>
        <Slider form={form} id="loan_amount" min={50_000} max={3_000_000} step={10_000} />

        <span>Form status: {formResult}</span>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
