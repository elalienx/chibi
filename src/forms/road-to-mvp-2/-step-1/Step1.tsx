// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../state/useFormNavigation";

export default function Step1() {
  // Global state
  const { setStep } = useFormNavigation();

  return (
    <div id="intro-step" className="business-form">
      <header>
        <h4>Road to MPV 2</h4>
      </header>

      <section>
        <p>
          To see what is pending to reach MVP status, check the first MPV here: <a href="./road-to-mvp">link</a>.
        </p>
      </section>

      <hr />

      <footer>
        <Button onClick={() => setStep("step-2")}>
          Next <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
