// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../state/useFormNavigation";

export default function Step5() {
  // Global state
  const { setStep, goPreviousStep } = useFormNavigation();

  return (
    <div className="business-form">
      <header>
        <ArrowGoBack hideLabel onClick={goPreviousStep} />
        <h5>Borgensman</h5>
        <small>Nästa: Form submission</small>
        <Icon name="hashtag" />
      </header>

      <hr />

      <section>(pending...)</section>

      <hr />

      <footer>
        <Button type="submit" onClick={() => setStep("success")}>
          Fortsätt <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
