// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../../state/useFormNavigation";
import ChildForm from "./components/ChildForm";

export default function Step7() {
  // Global state
  const { setStep, goPreviousStep } = useFormNavigation();

  return (
    <div id="step-7" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>7. Om hushållet</h4>
      </header>

      <section>
        {/* Not wired yet: saving and cancelling do nothing for now. */}
        <ChildForm childNumber={1} />
      </section>

      <hr />

      <footer>
        <Button onClick={() => setStep("success-step")}>
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </div>
  );
}
