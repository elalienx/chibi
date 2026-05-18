// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";

const schema = v.object({
  likes_beer: v.string("Say either yes or no."),
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
        {/* Replace RadioGroup with Select */}
        <RadioGroup form={form} id="likes_beer">
          <Label>Do you like beer?</Label>
          {/* Replace RadioOption with SelectOption, then with just Option */}
          <RadioOption value="sony">Playstation 5</RadioOption>
          <RadioOption value="nintendo">Switch 2</RadioOption>
          <RadioOption value="microsoft">Xbox Series X</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
