// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Label from "components/label/Label";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";

const schema = v.object({
  accessory: v.string("Choose the best accessory in history"),
  publisher: v.string("Choose one game developer company."),
  pc_engine_games: v.pipe(
    v.string("Choose a number of PC-Engine games."),
    v.toNumber("Choose a number of PC-Engine games."),
  ),
});

export default function FormPage() {
  // Local state
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Properties
  const noResult = "no result";
  const select1Value = getInput(form, { path: ["publisher"] }) || noResult;
  const select2Value = getInput(form, { path: ["accessory"] }) || noResult;
  const select3Value = getInput(form, { path: ["pc_engine_games"] }) || noResult;

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
          <SelectOption value="capcom">Capcom</SelectOption>
          <SelectOption value="electronic_arts">Electronic Arts</SelectOption>
          <SelectOption value="konami">Konami</SelectOption>
        </SelectGroup>

        <SelectGroup form={form} id="accessory">
          <Label>What was the best accessory in history?</Label>
          <SelectOption value="arcade_stick">Arcade stick</SelectOption>
          <SelectOption value="kinnect">Kinnect</SelectOption>
          <SelectOption value="wireless_controller">Wavebird controller</SelectOption>
        </SelectGroup>

        <SelectGroup form={form} id="pc_engine_games">
          <Label hint="PC-Engine is a japanese console from 1987">How many PC-Engine games you have?</Label>
          <SelectOption value={0}>None (never hear of PC-Engine)</SelectOption>
          <SelectOption value={1}>One game</SelectOption>
          <SelectOption value={2}>Two games</SelectOption>
          <SelectOption value={3}>Three or more games</SelectOption>
        </SelectGroup>

        <p>Text to verify Playwright assertions:</p>
        <ul>
          <li>Select 1 internal value: {select1Value}</li>
          <li>Select 2 internal value: {select2Value}</li>
          <li>Select 3 internal value: {select3Value}</li>
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
