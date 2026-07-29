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
        <h4>Mortgage MVP</h4>
      </header>

      <section>
        <ul className="first-level">
          <li>Add tracking.</li>
        </ul>
      </section>

      <hr />

      <footer>
        <Button onClick={() => setStep("step-1")}>
          Next <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
