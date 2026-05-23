// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import Select from "components/select/Select";

const schema = v.object({
  accessory: v.string("Choose one accessory."),
  publisher: v.pipe(v.string("Choose one game developer company."), v.toNumber("Choose one game developer company.")),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Properties
  const noResult = "no result";
  const select1Value = getInput(form, { path: ["publisher"] }) || noResult;
  const select2Value = getInput(form, { path: ["accessory"] }) || noResult;

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
        <SelectGroup form={form} id="publisher">
          <Label>What is your favorite game developer company?</Label>
          <Select>Choose a developer</Select>
          <SelectOption value="capcom">Capcom</SelectOption>
          <SelectOption value="electronic_arts">Electronic Arts</SelectOption>
          <SelectOption value="konami">Konami</SelectOption>
        </SelectGroup>

        <SelectGroup form={form} id="accessory">
          <Label hint="This test validates numeric values">What was the best accessory in history?</Label>
          <Select>Choose an accessory</Select>
          <SelectOption value={0}>Arcade stick</SelectOption>
          <SelectOption value={1}>Kinnect</SelectOption>
          <SelectOption value={2}>Multi-tap</SelectOption>
          <SelectOption value={3}>Link cable</SelectOption>
          <SelectOption value={4}>Wavebird controller</SelectOption>
          <SelectOption value={5}>Zapper</SelectOption>
        </SelectGroup>

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
