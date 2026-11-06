// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../state/useFormNavigation";

export default function IntroStep() {
  // Global state
  const { setStep } = useFormNavigation();

  return (
    <div id="intro-step" className="mortgage-form">
      <header>
        <h4>Consumer MVP</h4>
      </header>

      <section>This is a demo and its missing the full details for Step 1 and Step 4 to 5.</section>

      <hr />

      <footer>
        <Button onClick={() => setStep("step-1")}>
          Next <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
