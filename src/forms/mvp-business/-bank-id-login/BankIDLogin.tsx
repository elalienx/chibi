// Node modules
import { Form, setInput, useForm, validate } from "@formisch/react";
import type * as v from "valibot";

// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import cleanInitialInput from "helpers/cleanInitialInput";
import companyList from "../-step-3/companyList";
import exampleSSNs from "./exampleSSNs";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import "./bank-id-login.css";

// Properties
const { MULTIPLE_PUBLIC_COMPANIES, SINGLE_PUBLIC_COMPANY, SOLE_TRADER } = exampleSSNs;

export default function BankIDLogin() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application }),
  });

  // Methods
  function fillSSN(ssn: string) {
    setInput(form, { path: ["ssn"], input: ssn });
    validate(form); // To clear a previous error, as this form only validates on blur.
  }

  function submitForm(values: v.InferOutput<typeof schema>) {
    // Single company: pre-select it and skip the company selector.
    if (values.ssn === SINGLE_PUBLIC_COMPANY) {
      updateApplication({ ...values, company_org_number: companyList[0].value });
      setStep("step-4");
      return;
    }

    // Sole trader: no company to select. Reset it in case a previous login saved one.
    if (values.ssn === SOLE_TRADER) {
      updateApplication({ ...values, company_org_number: "" });
      setStep("step-4");
      return;
    }

    // note: update the application when we add SSN to it
    setStep("step-3");
  }

  return (
    <Form of={form} onSubmit={submitForm} className="business-form" id="bank-id-login">
      <section>
        <InputField form={form} id="ssn">
          <Label>Personnummer</Label>
          <Input type="text" placeholder="ÅÅÅÅMMDDXXXX" />
        </InputField>

        <div className="buttons">
          <Button type="submit">
            Skicka in <Icon name="bankid" />
          </Button>
          <Button variant="secondary" onClick={goPreviousStep}>
            <Icon name="arrow-left" /> Tillbaka
          </Button>
        </div>

        <div className="examples">
          <h4>Example SSN</h4>
          <ul className="check-list">
            <li>
              <Icon name="circle-check" /> Multiple public companies:{" "}
              <button type="button" className="example-ssn" onClick={() => fillSSN(MULTIPLE_PUBLIC_COMPANIES)}>
                {MULTIPLE_PUBLIC_COMPANIES}
              </button>
            </li>
            <li>
              <Icon name="circle-check" /> Single public company:{" "}
              <button type="button" className="example-ssn" onClick={() => fillSSN(SINGLE_PUBLIC_COMPANY)}>
                {SINGLE_PUBLIC_COMPANY}
              </button>
            </li>
            <li>
              <Icon name="circle-check" /> Sole trader:{" "}
              <button type="button" className="example-ssn" onClick={() => fillSSN(SOLE_TRADER)}>
                {SOLE_TRADER}
              </button>
            </li>
          </ul>
        </div>
      </section>
    </Form>
  );
}
