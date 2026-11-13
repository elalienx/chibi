// Node modules
import { useState } from "react";
import { Form, useForm } from "@formisch/react";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../../state/useApplication";
import useFormNavigation from "../../state/useFormNavigation";
import type Child from "../../types/Child";
import ChildForm from "./components/child-form/ChildForm";
import Counter from "./components/counter/Counter";
import EditCard from "./components/edit-card/EditCard";
import schema from "./schema";
import "./step-7.css";

export default function Step7() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const [childIndex, setChildIndex] = useState<number | null>(null);
  const form = useForm({
    schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Derived state
  const children = application.household_children;
  const isAddingChild = childIndex !== null;

  // Methods

  function saveChild(child: Child, index: number) {
    const updatedChildren = [...children];

    updatedChildren[index] = child;
    updateApplication({ household_children: updatedChildren });
    setChildIndex(null);
  }

  function deleteChild(deleteIndex: number) {
    const updatedChildren = children.filter((_, index) => index !== deleteIndex);

    updateApplication({ household_children: updatedChildren });
  }

  function submitForm(values: object) {
    updateApplication(values);
    setStep("success-step");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-7" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>7. Om hushållet</h4>
      </header>

      {/* Adult information */}
      <section className="adults">
        <h5>Antal vuxna</h5>
        <p>Ange hur många vuxna (18 år eller äldre) som bor i hushållet. Räkna med dig själv.</p>
        <Counter id="household_adults" form={form} label="Hur många vuxna är ni i hushållet?" min={1} max={15} />
      </section>

      {/* Children information */}
      <section className="children">
        <h5>Antal barn</h5>
        <p>
          Ange hur många barn under 18 år du eller din medsökande har, även om de inte bor hos er. Har du inga barn? Då
          kan du hoppa över den här delen.
        </p>

        {isAddingChild && (
          <ChildForm
            childNumber={childIndex + 1}
            child={children[childIndex]}
            onCancel={() => setChildIndex(null)}
            onSave={(child) => saveChild(child, childIndex)}
          />
        )}

        {!isAddingChild &&
          children.map((child, index) => (
            <EditCard
              key={index}
              childNumber={index + 1}
              child={child}
              onEdit={() => setChildIndex(index)}
              onDelete={() => deleteChild(index)}
            />
          ))}

        {!isAddingChild && (
          <Button variant="secondary" onClick={() => setChildIndex(children.length)}>
            Lägg till ett barn <Icon name="plus" />
          </Button>
        )}
      </section>

      <hr />

      <footer>
        <Button type="submit" disabled={isAddingChild}>
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
