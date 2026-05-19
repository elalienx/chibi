// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectOption from "components/select-option/SelectOption";

const schema = v.object({
  accessory: v.string("Choose the best accessory in history"),
  publisher: v.string("Choose one game developer company."),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Properties
  const select1Value = getInput(form, { path: ["publisher"] }) || "no result";
  const select2Value = getInput(form, { path: ["accessory"] }) || "no result";

  // Methods
  function submitForm() {
    if (form.isValid) alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Select tests</h4>
      </header>

      <section>
        <Select form={form} id="publisher">
          <Label>What is your favorite game developer company?</Label>
          <SelectOption value="capcom">Capcom</SelectOption>
          <SelectOption value="electronic_arts">Electronic Arts</SelectOption>
          <SelectOption value="konami">Konami</SelectOption>
        </Select>

        <Select form={form} id="accessory">
          <Label hint="Used to make gaming more fun!">What was the best accessory in history?</Label>
          <SelectOption value="arcade_stick">Arcade stick</SelectOption>
          <SelectOption value="kinnect">Kinnect</SelectOption>
          <SelectOption value="wireless_controller">Wavebird controller</SelectOption>
        </Select>

        <p>Text to verify Playwright assertions:</p>
        <ul>
          <li>Select 1 internal value: {select1Value}</li>
          <li>Select 2 internal value: {select2Value}</li>
        </ul>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
