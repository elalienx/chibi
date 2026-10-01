// Node modules
import { Form, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import preview from "../../../../../.storybook/preview";
import LoanDetailsEdit from "./LoanDetailsEdit";

// Metadata
const meta = preview.meta({
  title: "MVP Business/Step 2: Personal info/Loan Details Edit",
  component: LoanDetailsEdit,
});

// Properties
const loan_amount = v.pipe(
  v.string("Vänligen ange lånesumma."),
  v.nonEmpty("Vänligen ange lånesumma."),
  v.toNumber("Vänligen ange en giltig lånesumma."),
  v.integer("Vänligen ange lånesumman i hela kronor."),
  v.minValue(1_000, `Måste vara minst ${Number(1_000).toLocaleString("sv-SE")} kr.`),
  v.maxValue(100_000, `Måste vara maximalt ${Number(100_000).toLocaleString("sv-SE")} kr.`),
);
const loan_period = v.pipe(
  v.string("Vänligen ange lånetid."),
  v.nonEmpty("Vänligen ange lånetid."),
  v.toNumber("Vänligen ange en giltig lånetid."),
  v.integer("Vänligen ange lånetiden i hela år."),
  v.minValue(Math.ceil(1), `Måste vara minst ${Math.ceil(1)} år.`),
  v.maxValue(5, `Måste vara maximalt ${Number(5).toLocaleString("sv-SE")} år.`),
);
const schema = v.object({ loan_amount, loan_period });

// Methods
function onClose() {
  alert("On close...");
}

// Stories
export const Default = meta.story({
  name: "Loan Edit Details",
  render: () => {
    const form = useForm({ schema: schema, validate: "blur", revalidate: "blur" });

    return (
      <Form of={form} onSubmit={() => alert("Success")}>
        <LoanDetailsEdit form={form} onClose={onClose} />
      </Form>
    );
  },
});

export default meta;
