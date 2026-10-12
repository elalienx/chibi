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
import BusinessFormConfig from "../data/BusinessFormConfig";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import useMediaQuery from "state/useMediaQuery";
import schema from "./schema";
import "./step-1.css";

const { MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD, PERIOD_STEP } = BusinessFormConfig;
const LOAN_AMOUNT = "loan_amount";
const LOAN_PEIROD = "loan_period";

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
  function changePeriod(step: number) {
    const period = Number(getInput(form, { path: [LOAN_PEIROD] })) || MIN_PERIOD;
    const newPeriod = Math.min(Math.max(period + step, MIN_PERIOD), MAX_PERIOD);

    setInput(form, { path: [LOAN_PEIROD], input: String(newPeriod) });
  }

  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-2");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="hero-form" id="step-1">
      <div id="input-with-slider">
        <Label id={LOAN_AMOUNT}>{isTablet ? "Välj lånesumma:" : "Lånesumma:"}</Label>
        <Input id={LOAN_AMOUNT} form={form} type="number" suffix="kr" min={MIN_AMOUNT} max={MAX_AMOUNT} />
        <Slider id={LOAN_AMOUNT} form={form} label="Lånesumma" min={MIN_AMOUNT} max={MAX_AMOUNT} step={1_000} />
      </div>

      <div id="input-with-counter-buttons">
        <Label id={LOAN_PEIROD}>{isTablet ? "Välj lånetid:" : "Lånetid:"}</Label>
        <ButtonCircle label="Minska lånetid" onClick={() => changePeriod(-PERIOD_STEP)}>
          <Icon name="minus" />
        </ButtonCircle>
        <Input id={LOAN_PEIROD} form={form} type="number" suffix="år" allowDecimals min={MIN_PERIOD} max={MAX_PERIOD} />
        <ButtonCircle label="Öka lånetid" onClick={() => changePeriod(PERIOD_STEP)}>
          <Icon name="plus" />
        </ButtonCircle>
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
