// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";

interface Props {
  onContinue: () => void;
}

export default function Step1({ onContinue }: Props) {
  return (
    <div id="step-1" className="soft-background">
      <section className="top">
        <header>
          <a className="link-go-back" href="/">
            <Icon name="arrow-left" /> Tillbaka
          </a>
          <h4>Road to MPV</h4>
        </header>

        <ul>
          <li>
            Formulary:
            <ul>
              <li>Change third input based on property type.</li>
              <li>Add form submission.</li>
              <li>Add persistence.</li>
            </ul>
          </li>
          <li>Format input currency using spaces.</li>
          <li>Add tooltips.</li>
          <li>Add tracking.</li>
        </ul>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={onContinue}>
          Nästa <Icon name="arrow-right" />
        </Button>
      </section>
    </div>
  );
}
