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
import SelectorGroup from "components/selector-group/SelectorGroup";
import SelectorOption from "components/selector-option/SelectorOption";
import GuinessTooltip from "./GuinessTooltip";

const schema = v.object({
  name: v.pipe(v.string(), v.nonEmpty("Please enter your full name.")),
  likes_beer: v.pipe(v.string(), v.nonEmpty("Say either yes or no.")),
  favorite_brand: v.pipe(v.string(), v.nonEmpty("Choose a brand.")),
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
    alert("Success");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="default-form">
      <header>
        <h4>Tooltip tests</h4>
        <p>
          The <b>InputField</b> and <b>RadioGroup</b> were added to make sure clicking the tooltip don't trigger a form
          submission. <Tooltip>Click me for more info</Tooltip>
        </p>
      </header>

      <section>
        <InputField form={form} hints={hints} id="name">
          <Label>Full name</Label>
          <Input type="text" placeholder="Leif Lend" />
        </InputField>

        <RadioGroup form={form} hints={hints} id="likes_beer">
          <Label>Do you like beer?</Label>
          <RadioOption value="yes">Yes</RadioOption>
          <RadioOption value="no">No</RadioOption>
        </RadioGroup>

        <SelectorGroup form={form} hints={hints} id="favorite_brand">
          <Label hint={GuinessTooltip}>Which brand do you like the most?</Label>
          <SelectorOption value="guiness">Guiness</SelectorOption>
          <SelectorOption value="heineken">Heineken</SelectorOption>
        </SelectorGroup>
      </section>

      <hr />

      <footer>
        <Button type="submit">Submit</Button>
        <small>(Text to clean Playwright selector)</small>
      </footer>
    </Form>
  );
}
