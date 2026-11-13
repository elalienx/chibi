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
import ChildForm from "./components/ChildForm";
import Counter from "./components/Counter";
import EditCard from "./components/EditCard";
import schema from "./schema";
import "./step-7.css";

export default function Step7() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const [editingIndex, setEditingIndex] = useState<number | null>(null); // null = no child form open.
  const form = useForm({
    schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Derived state
  const children = application.household_children;
  const isAddingChild = editingIndex !== null; // A child form is open, for a new or a saved child.

  // Methods
  function addChild() {
    setEditingIndex(children.length);
  }

  function saveChild(child: Child) {
    // Safeguard
    if (editingIndex === null) return;

    const updatedChildren = [...children];

    updatedChildren[editingIndex] = child; // children.length adds a new child; any other index replaces a saved one.
    updateApplication({ household_children: updatedChildren });
    setEditingIndex(null);
  }

  function deleteChild(deleteIndex: number) {
    const updatedChildren = children.filter((_, index) => index !== deleteIndex);

    updateApplication({ household_children: updatedChildren });
  }

  function cancelChild() {
    setEditingIndex(null);
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
        <div className="child-list">
          {!isAddingChild &&
            children.map((child, index) => (
              <EditCard
                key={index}
                childNumber={index + 1}
                child={child}
                onEdit={() => setEditingIndex(index)}
                onDelete={() => deleteChild(index)}
              />
            ))}

          {!isAddingChild && (
            <Button variant="secondary" onClick={addChild}>
              Lägg till ett barn <Icon name="plus" />
            </Button>
          )}

          {isAddingChild && (
            <ChildForm
              childNumber={editingIndex + 1}
              child={children[editingIndex]}
              onCancel={cancelChild}
              onSave={saveChild}
            />
          )}
        </div>
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
