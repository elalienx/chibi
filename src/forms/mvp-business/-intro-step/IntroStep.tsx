// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../state/useFormNavigation";

export default function Step1() {
  // Global state
  const { setStep } = useFormNavigation();

  return (
    <div id="intro-step" className="default-form">
      <header>
        <h5>Road to MPV 2</h5>
      </header>

      <section>
        <p>To see what is pending to reach MVP status, check the MVP 1.</p>
      </section>

      <hr />

      <footer>
        {/* Note: We are moving directly to step 4 as we haven't mocked the other steps */}
        <Button onClick={() => setStep("step-4")}>
          Next <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
