// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";

interface Props {
  onContinue: () => void;
}

export default function Step2({ onContinue }: Props) {
  // Properties
  const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

  // Methods
  function submitForm() {
    if (form.isValid) onContinue();
  }

  return (
    <div id="step-2" className="soft-background">
      <section className="top">
        <header>
          <a className="link-go-back" href="/">
            <Icon name="arrow-left" /> Tillbaka
          </a>
          <h4>1. About the loan</h4>
        </header>

        <p>Small form goes here</p>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={onContinue}>
          Next <Icon name="arrow-right" />
        </Button>
      </section>
    </div>
  );
}
