// Node modules
import { Form, useForm } from "@formisch/react";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Slider from "components/slider/Slider";
import cleanInitialInput from "helpers/cleanInitialInput";
import BusinessFormConfig from "../data/BusinessFormConfig";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import useMediaQuery from "state/useMediaQuery";
import schema from "./schema";
import "./step-1.css";

const { MIN_AMOUNT, MAX_AMOUNT, MIN_PERIOD, MAX_PERIOD } = BusinessFormConfig;

export default function Step1() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep } = useFormNavigation();

  // Local state
  const isTablet = useMediaQuery("(min-width: 550px)");
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function submitForm(values: object) {
    updateApplication(values);
    setStep("step-2");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="hero-form" id="step-1">
      <div className="input-and-slider">
        <InputField form={form} id="loan_amount">
          <Label>{isTablet ? "Välj lånesumma:" : "Lånesumma:"}</Label>
          <Input type="number" suffix="kr" min={MIN_AMOUNT} max={MAX_AMOUNT} />
        </InputField>

        <Slider id="loan_amount" form={form} label="Lånesumma" min={MIN_AMOUNT} max={MAX_AMOUNT} step={1_000} />
      </div>

      <InputField form={form} id="loan_period">
        <Label>{isTablet ? "Välj lånetid:" : "Lånetid:"}</Label>
        <Input type="number" suffix="år" allowDecimals min={MIN_PERIOD} max={MAX_PERIOD} />
      </InputField>

      <footer>
        <Button type="submit">
          Påbörja ansökan <Icon name="arrow-right" />
        </Button>
        <small>(Ansökan är inte bindande)</small>
      </footer>
    </Form>
  );
}
