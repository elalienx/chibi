// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../state/useFormNavigation";

export default function IntroStep() {
  // Global state
  const { setStep } = useFormNavigation();

  return (
    <div id="intro-step" className="default-form">
      <header>
        <h5>Business MVP</h5>
      </header>

      <section>
        <p>This is the MVP of business, it will replicate all Business screens even if not all components are ready.</p>
        <p>Please ask about the project management status to know about the progress of missing components.</p>
      </section>

      <hr />

      <footer>
        <Button onClick={() => setStep("step-1")}>
          Start demo
          <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
