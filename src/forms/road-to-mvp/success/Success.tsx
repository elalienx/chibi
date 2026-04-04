// Project files
import Button from "components/button/Button";
import useFormStore from "../useFormStore";

interface Props {
  onContinue: () => void;
}

export default function Success({ onContinue }: Props) {
  // Global state
  const { formStore } = useFormStore();

  // Properties
  const isApartment = formStore.property_type == "apartment";
  const costName = isApartment ? "montly fee" : "operating cost";
  const costPrice = isApartment ? formStore.monthly_fee : formStore.operating_cost;

  return (
    <div className="soft-background">
      <section className="top">
        <header>
          <h3>Form submitted</h3>
        </header>

        <p>
          You choose a {formStore.size}m {formStore.property_type} with {formStore.rooms} rooms.
        </p>
        <p>
          Therefore your {costName} is {costPrice} SEK.
        </p>
        <p>Please share which parts of the previous screen did not behave like the real Lendo site.</p>
        <p>Feel free to critizise everything from missing icons, incorrect spacing, font size, etc.</p>
      </section>

      <hr />

      <section className="bottom">
        <Button onClick={onContinue}>START AGAIN</Button>
      </section>
    </div>
  );
}
