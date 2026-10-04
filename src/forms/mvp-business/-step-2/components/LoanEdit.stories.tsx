// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../../../.storybook/preview";
import LoanEdit from "./LoanEdit";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Edit",
  component: LoanEdit,
});

// Properties
const loan_amount = v.pipe(
  v.string("Vänligen ange lånesumma."),
  v.nonEmpty("Vänligen ange lånesumma."),
  v.toNumber("Vänligen ange en giltig lånesumma."),
  v.minValue(50_000, `Måste vara minst ${Number(50_000).toLocaleString("sv-SE")} kr.`),
  v.maxValue(30_000_000, `Måste vara maximalt ${Number(30_000_000).toLocaleString("sv-SE")} kr.`),
);
const loan_period = v.pipe(
  v.string("Vänligen ange lånetid."),
  v.nonEmpty("Vänligen ange lånetid."),
  v.toNumber("Vänligen ange en giltig lånetid."),
  v.integer("Vänligen ange lånetiden i hela år."),
  v.minValue(0.5, `Måste vara minst ${0.5} år.`),
  v.maxValue(5, `Måste vara maximalt ${Number(5).toLocaleString("sv-SE")} år.`),
);

const schema = v.object({ loan_amount, loan_period });

// Methods
function onClose() {
  alert("On close...");
}

// Stories
export const Default = meta.story({
  name: "Loan Edit",
  render: () => {
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <LoanEdit form={form} onClose={onClose} />
      </Form>
    );
  },
});

export default meta;
