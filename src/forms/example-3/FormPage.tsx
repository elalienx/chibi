// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import RadioGroup from "components/radio-group/RadioGroup";
import RadioOption from "components/radio-option/RadioOption";
import Tooltip from "components/tooltip/Tooltip";

const schema = v.object({
  name: v.pipe(v.string("Please enter your full name."), v.nonEmpty("Please enter your full name.")),
  likes_beer: v.string("Say either yes or no."),
});

const hints = {
  name: "Write both your first and last name.",
  likes_beer: "You can see yes if you like Cider as well.",
};

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm() {
    if (form.isValid) alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="soft-background">
      <section className="top">
        <header>
          <h4>Tooltip tests</h4>
          <p>
            The <code>InputField</code> and <code>RadioGroup</code> are added to make sure clicking the tooltip don't
            trigger a form submission. <Tooltip>Click me for more info</Tooltip>
          </p>
        </header>

        <InputField form={form} hints={hints} id="name">
          <Label>Full name</Label>
          <Input type="text" placeholder="Leif Lend" />
        </InputField>

        <RadioGroup form={form} hints={hints} id="likes_beer">
          <Label>Do you like beer?</Label>
          <RadioOption value="yes">Yes</RadioOption>
          <RadioOption value="no">No</RadioOption>
        </RadioGroup>
      </section>

      <hr />

      <section className="bottom" style={{ textAlign: "center" }}>
        <Button type="submit">Submit</Button>
        <br />
        <small>(Text to clean Playwright selector)</small>
      </section>
    </Form>
  );
}
