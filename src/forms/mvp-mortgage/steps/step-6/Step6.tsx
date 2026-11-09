// Node modules
import { Form, getInput, useForm } from "@formisch/react";

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
import initialApplication from "../../data/initialApplication";
import employmentEndYears from "../../data/employmentEndYears";
import employmentStartYears from "../../data/employmentStartYears";
import months from "../../data/months";
import useApplication from "../../state/useApplication";
import useFormNavigation from "../../state/useFormNavigation";
import getEmploymentFields from "../step-5/helpers/getEmploymentFields";
import getStartMonths from "../step-5/helpers/getStartMonths";
import buildSchema from "./schema";
import Tooltips from "../step-5/Tooltips";
import "./step-6.css";

// Properties
interface Props {
  /** The employment type the user selected in Step 4 to tailor this step questions. */
  employmentType: string;
}

export default function Step6({ employmentType }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: buildSchema(employmentType),
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application.co, treatZeroAsEmpty: true }),
  });

  // Derived state
  const { hasEmployer, hasEndDate, hasPension, hasProfession, hasIncome } = getEmploymentFields(employmentType);
  const startYear = hasEmployer ? Number(getInput(form, { path: ["employment_since_year"] })) : 0;
  const startMonths = getStartMonths(startYear);
  const hasForeignIncome = getInput(form, { path: ["employment_income_in_foreign_currency"] }) === "true";

  // Methods
  function submitForm(values: object) {
    // Resets the fields hidden by the current employment type.
    updateApplication({ co: { ...initialApplication.co, ...values } });
    setStep("success-step");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-6" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>6. Din medsökandes arbetssituation</h4>
      </header>

      <section>
        {hasEmployer && (
          <>
            <InputField form={form} id="employment_company_name">
              <Label>Medsökandes arbetsgivare</Label>
              <Input type="text" placeholder="Ex. Lendo AB" />
            </InputField>

            <div className="date-columns">
              <SelectGroup form={form} id="employment_since_year">
                <Label>Anställd sedan</Label>
                <Select>Ange året medsökande började</Select>
                {employmentStartYears.map((year) => (
                  <SelectOption key={year} value={year}>
                    {year}
                  </SelectOption>
                ))}
              </SelectGroup>

              <SelectGroup form={form} id="employment_since_month">
                <Label>Anställd sedan, månad</Label>
                <Select>Ange månad</Select>
                {startMonths.map(({ label, value }) => (
                  <SelectOption key={value} value={value}>
                    {label}
                  </SelectOption>
                ))}
              </SelectGroup>
            </div>
          </>
        )}

        {hasEndDate && (
          <div className="date-columns">
            <SelectGroup form={form} id="employment_to_year">
              <Label>Anställd till</Label>
              <Select>Ange år</Select>
              {employmentEndYears.map((year) => (
                <SelectOption key={year} value={year}>
                  {year}
                </SelectOption>
              ))}
            </SelectGroup>

            <SelectGroup form={form} id="employment_to_month">
              <Label>Anställd till, månad</Label>
              <Select>Ange månad</Select>
              {months.map(({ label, value }) => (
                <SelectOption key={value} value={value}>
                  {label}
                </SelectOption>
              ))}
            </SelectGroup>
          </div>
        )}

        {hasProfession && (
          <InputField form={form} id="employment_profession">
            <Label>Medsökandes yrke</Label>
            <Input type="text" placeholder="Ex. Sjuksköterska" />
          </InputField>
        )}

        {hasIncome && (
          <InputField form={form} tooltips={Tooltips} id="employment_monthly_income">
            <Label>Medsökandes månadsinkomst (före skatt)</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}

        {hasPension && (
          <InputField form={form} tooltips={Tooltips} id="employment_monthly_pension">
            <Label>Medsökandes livsvariga pension (före skatt)</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}

        <ToggleGroup form={form} tooltips={Tooltips} id="employment_income_in_foreign_currency">
          <Label>Har din medsökande huvudsaklig inkomst i utländsk valuta?</Label>
          <ToggleOption value={true}>Ja</ToggleOption>
          <ToggleOption value={false}>Nej</ToggleOption>
        </ToggleGroup>

        {hasForeignIncome && (
          <ValidationMessage ariaErrorId="co-foreign-currency-warning">
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
