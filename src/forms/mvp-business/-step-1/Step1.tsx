// Node modules
import { Form, getInput, setInput, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import ButtonCircle from "components/button-circle/ButtonCircle";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import Label from "components/label/Label";
import Slider from "components/slider/Slider";
import cleanInitialInput from "helpers/cleanInitialInput";
import businessFormConfig from "../data/businessFormConfig";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import useMediaQuery from "state/useMediaQuery";
import schema from "./schema";
import "./styles/step-1-cta-button.css";
import "./styles/step-1-input-design.css";
import "./styles/step-1-input-state.css";
import "./styles/step-1-input-with-slider.css";
import "./styles/step-1-input-with-count-buttons.css";

const { AMOUNT_STEP, MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD, PERIOD_STEP } = businessFormConfig;
const LOAN_AMOUNT = "loan_amount";
const LOAN_PERIOD = "loan_period";

export default function Step1() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep } = useFormNavigation();
  const isTablet = useMediaQuery("(min-width: 550px)");

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function onChangePeriod(step: number) {
    const formField = getInput(form, { path: [LOAN_PERIOD] });
    const currentPeriod = Number(formField);
    const newPeriod = Math.min(Math.max(currentPeriod + step, MIN_PERIOD), MAX_PERIOD);

    setInput(form, { path: [LOAN_PERIOD], input: String(newPeriod) });
  }

  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-2");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="hero-form" id="step-1">
      <div id="input-with-slider">
        <Label id={LOAN_AMOUNT}>{isTablet ? "Välj lånesumma:" : "Lånesumma:"}</Label>
        <Input id={LOAN_AMOUNT} form={form} max={MAX_AMOUNT} min={MIN_AMOUNT} suffix="kr" type="number" />
        <Slider id={LOAN_AMOUNT} form={form} label="Lånesumma" max={MAX_AMOUNT} min={MIN_AMOUNT} step={AMOUNT_STEP} />
      </div>

      <div id="input-with-stepper-buttons">
        <Label id={LOAN_PERIOD}>{isTablet ? "Välj lånetid:" : "Lånetid:"}</Label>
        <ButtonCircle icon="minus" name="Minska lånetid" onClick={() => onChangePeriod(-PERIOD_STEP)} />
        <Input id={LOAN_PERIOD} form={form} allowDecimals type="number" max={MAX_PERIOD} min={MIN_PERIOD} suffix="år" />
        <ButtonCircle icon="plus" name="Öka lånetid" onClick={() => onChangePeriod(PERIOD_STEP)} />
      </div>

      <footer>
        <Button type="submit">
          Påbörja ansökan <Icon name="arrow-right" />
        </Button>
        <small>(Ansökan är inte bindande)</small>
      </footer>
    </Form>
  );
}
