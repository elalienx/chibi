// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import Select from "components/select/Select";
import SelectOption from "components/select-option/SelectOption";

const schema = v.object({
  console: v.string("Choose one gaming console."),
  publisher: v.string("Choose one game developer company."),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

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
        <RadioGroup form={form} id="console">
          <Label>What is your favorite gaming console?</Label>
          <RadioOption value="playstation_5">Playstation 5</RadioOption>
          <RadioOption value="switch_2">Switch 2</RadioOption>
          <RadioOption value="xbox_series_x">Xbox Series X</RadioOption>
        </RadioGroup>

        <Select form={form} id="publisher">
          <Label>What is your favorite game developer company?</Label>
          <SelectOption value="capcom">Capcom</SelectOption>
          <SelectOption value="electronic_arts">Electronic Arts</SelectOption>
          <SelectOption value="konami">Konami</SelectOption>
        </Select>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
