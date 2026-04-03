// Project files
import Button from "components/button/Button";

interface Props {
  onContinue: () => void;
}

export default function Success({ onContinue }: Props) {
  return (
    <div className="soft-background">
      <section className="top">
        <header>
          <h3>Demo complete!</h3>
        </header>

        <p>Please send your feedback on what parts of the previous screen did not behave like the real Lendo site.</p>
        <p>Feel free to critizise everything from missing icons, incorrect spacing, font size, etc.</p>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={onContinue}>START AGAIN</Button>
      </section>
    </div>
  );
}
