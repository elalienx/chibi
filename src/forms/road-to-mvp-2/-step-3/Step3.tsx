// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../state/useFormNavigation";

export default function Step3() {
  // Global state
  const { setStep, goPreviousStep } = useFormNavigation();

  return (
    <div className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h4>Val av bolag</h4>
      </header>

      <section>(pending...)</section>

      <hr />

      <footer>
        <Button type="submit" onClick={() => setStep("step-4")}>
          Fortsätt <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
