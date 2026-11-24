// Node modules
import type { SubmitEvent } from "react";
import { getInput, handleSubmit, insert, remove, reset, useFieldArray, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useFormNavigation from "../../state/useFormNavigation";
import Counter from "../step-7/components/counter/Counter";
import schemaAdults from "../step-7/schema";
import ChildSubForm from "./components/child-sub-form/ChildSubForm";
import schemaChildren from "./schema";
import "./step-7-plus.css";

const INITIAL_CHILD = {
  child_age: "",
  child_receives_allowance: "",
  child_lives_with_applicant: "",
  child_shared_custody: "",
  child_maintenance: "",
};
const CLEAR_SUBMIT_STATE = { keepInput: true, keepTouched: true, keepEdited: true };

export default function Step7Plus() {
  // Global state
  const { goPreviousStep } = useFormNavigation();

  // Local state
  const adultsForm = useForm({
    schema: schemaAdults,
    validate: "blur",
    revalidate: "blur",
    initialInput: { household_adults: "1" },
  });
  const childrenForm = useForm({
    schema: schemaChildren,
    validate: "blur",
    revalidate: "blur",
    initialInput: { household_children: [] },
  });
  const children = useFieldArray(childrenForm, { path: ["household_children"] });

  // Methods
  async function addChild() {
    await handleSubmit(childrenForm, () => {})();

    // Safeguard
    if (!childrenForm.isValid) return;

    insert(childrenForm, { path: ["household_children"], initialInput: INITIAL_CHILD });
    reset(childrenForm, CLEAR_SUBMIT_STATE);
  }

  function deleteChild(index: number) {
    remove(childrenForm, { path: ["household_children"], at: index });
  }

  async function validateForms(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    await handleSubmit(adultsForm, () => {})();
    await handleSubmit(childrenForm, () => {})();

    // Safeguard
    if (!adultsForm.isValid || !childrenForm.isValid) return;

    submitForms();
  }

  function submitForms() {
    const adults = getInput(adultsForm);
    const household = getInput(childrenForm);

    alert(`Success! ${adults.household_adults} adult(s) and ${household.household_children?.length} child(ren)`);
  }

  return (
    <form noValidate onSubmit={validateForms} id="step-7-plus" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>7. Om hushållet</h4>
      </header>

      {/* Adult information */}
      <section className="adults">
        <h5>Antal vuxna</h5>
        <p>Ange hur många vuxna (18 år eller äldre) som bor i hushållet. Räkna med dig själv.</p>
        <Counter id="household_adults" form={adultsForm} label="Hur många vuxna är ni i hushållet?" min={1} max={15} />
      </section>

      {/* Children information */}
      <section className="children">
        <h5>Antal barn</h5>
        <p>
          Ange hur många barn under 18 år du eller din medsökande har, även om de inte bor hos er. Har du inga barn? Då
          kan du hoppa över den här delen.
        </p>

        {children.items.map((key, index) => (
          <ChildSubForm
            key={key}
            form={childrenForm}
            index={index}
            childNumber={index + 1}
            onDelete={() => deleteChild(index)}
          />
        ))}

        <Button variant="borderless" onClick={addChild}>
          Lägg till ett barn <Icon name="plus" />
        </Button>
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </form>
  );
}
