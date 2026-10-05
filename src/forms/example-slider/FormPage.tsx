// Node modules
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
});

const INITIAL = 1_500_000;
const MINIMUM = 50_000;
const MAXIMUM = 3_000_000;
const INCREMENT = 10_000;

export default function FormPage() {
  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: { loan_amount: String(INITIAL) },
  });

  // Derived state

  // Methods
  function submitForm() {
    alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Slider tests</h4>
      </header>

      <section>
        <InputField form={form} id="loan_amount">
          <Label>Loan amount</Label>
          <Input type="number" suffix="kr" min={MINIMUM} max={MAXIMUM} />
        </InputField>
        {/* Note: The Slider should be part of InputField */}
        <Slider form={form} id="loan_amount" label="Loan amount" min={MINIMUM} max={MAXIMUM} step={INCREMENT} />
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
