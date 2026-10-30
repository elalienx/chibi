// Node modules
import { Form, getInput, useForm } from "@formisch/react";
import * as v from "valibot";

// Project files
import ArrowGoBack from "components/arrow-go-back/ArrowGoBack";
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import Input from "components/input/Input";
import InputField from "components/input-field/InputField";
import Label from "components/label/Label";
import Select from "components/select/Select";
import SelectGroup from "components/select-group/SelectGroup";
import SelectOption from "components/select-option/SelectOption";
import ToggleGroup from "components/toggle-group/ToggleGroup";
import ToggleOption from "components/toggle-option/ToggleOption";
import ValidationMessage from "components/validation-message/ValidationMessage";
import cleanInitialInput from "helpers/cleanInitialInput";
import months from "../data/months";
import years from "../data/years";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import schema from "./schema";
import "./step-5.css";

// Properties
const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1; // getMonth() starts at 0

export default function Step5() {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: schema,
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application, treatZeroAsEmpty: true }),
  });

  // Derived state
  const sinceYear = Number(getInput(form, { path: ["main_employment_since_year"] }));
  const sinceMonths = sinceYear === currentYear ? months.filter(({ value }) => value <= currentMonth) : months;
  const hasForeignIncome = getInput(form, { path: ["main_employment_income_in_foreign_currency"] }) === "true";
  const incomeTooltip = `I månadsinkomsten ska du ej räkna in bidrag utan enbart inkomster du skattar för.`;
  const foreignCurrencyTooltip = `Om du tjänar din inkomst i annan valuta än svenska kronor kan det påverka din möjlighet att få ett lån.`;

  // Methods
  function submitForm(values: v.InferOutput<typeof schema>) {
    updateApplication(values);
    setStep(application.has_co_applicant ? "step-6" : "success-step");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-5" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>5. Din arbetssituation</h4>
      </header>

      <section>
        <InputField form={form} id="main_employment_company_name">
          <Label>Arbetsgivare</Label>
          <Input type="text" placeholder="Ex. Lendo AB" />
        </InputField>

        <div className="date">
          <SelectGroup form={form} id="main_employment_since_year">
            <Label>Anställd sedan</Label>
            <Select>Ange året du började</Select>
            {years.map((year) => (
              <SelectOption key={year} value={year}>
                {String(year)}
              </SelectOption>
            ))}
          </SelectGroup>

          <SelectGroup form={form} id="main_employment_since_month">
            <Label>Anställd sedan, månad</Label>
            <Select>Ange månad</Select>
            {sinceMonths.map(({ label, value }) => (
              <SelectOption key={value} value={value}>
                {label}
              </SelectOption>
            ))}
          </SelectGroup>
        </div>

        <div className="date">
          <SelectGroup form={form} id="main_employment_to_year">
            <Label>Anställd till</Label>
            <Select>Ange år</Select>
            {years.map((year) => (
              <SelectOption key={year} value={year}>
                {String(year)}
              </SelectOption>
            ))}
          </SelectGroup>

          <SelectGroup form={form} id="main_employment_to_month">
            <Label>Anställd till, månad</Label>
            <Select>Ange månad</Select>
            {months.map(({ label, value }) => (
              <SelectOption key={value} value={value}>
                {label}
              </SelectOption>
            ))}
          </SelectGroup>
        </div>

        <InputField form={form} id="main_employment_monthly_income">
          <Label tooltip={incomeTooltip}>Månadsinkomst (före skatt)</Label>
          <Input type="number" suffix="kr" />
        </InputField>

        <InputField form={form} id="main_employment_profession">
          <Label>Yrke</Label>
          <Input type="text" placeholder="Ex. Sjuksköterska" />
        </InputField>

        <ToggleGroup form={form} id="main_employment_income_in_foreign_currency">
          <Label tooltip={foreignCurrencyTooltip}>Har du huvudsaklig inkomst i utländsk valuta?</Label>
          <ToggleOption value={true}>Ja</ToggleOption>
          <ToggleOption value={false}>Nej</ToggleOption>
        </ToggleGroup>

        {hasForeignIncome && (
          <ValidationMessage ariaErrorId="foreign-currency-warning">
            Vi kan tyvärr bara hjälpa dig om din inkomst är i svenska kronor (SEK).
          </ValidationMessage>
        )}
      </section>

      <hr />

      <footer>
        <Button type="submit">
          Nästa <Icon name="arrow-right" />
        </Button>
      </footer>
    </Form>
  );
}
