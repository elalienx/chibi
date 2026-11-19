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
import getEmploymentFields from "./helpers/getEmploymentFields";
import getStartMonths from "./helpers/getStartMonths";
import buildSchema from "./schema";
import Tooltips from "./Tooltips";
import "./step-5.css";

// Properties
interface Props {
  /** The employment type the user selected in Step 3 to tailor this step questions. */
  employmentType: string;
}

export default function Step5({ employmentType }: Props) {
  // Global state
  const { application, updateApplication } = useApplication();
  const { setStep, goPreviousStep } = useFormNavigation();

  // Local state
  const form = useForm({
    schema: buildSchema(employmentType),
    validate: "blur",
    revalidate: "blur",
    initialInput: cleanInitialInput({ input: application.main, treatZeroAsEmpty: true }),
  });

  // Derived state
  const { hasEmployer, hasEndDate, hasPension, hasProfession, hasIncome } = getEmploymentFields(employmentType);
  const startYear = hasEmployer ? Number(getInput(form, { path: ["employment_since_year"] })) : 0;
  const startMonths = getStartMonths(startYear);
  const hasForeignIncome = getInput(form, { path: ["employment_income_in_foreign_currency"] }) === "true";

  // Methods
  function submitForm(values: object) {
    // Resets the fields hidden by the current employment type.
    updateApplication({ main: { ...initialApplication.main, ...values } });
    setStep(application.has_co_applicant ? "step-6" : "step-7");
  }

  return (
    <Form of={form} onSubmit={submitForm} id="step-5" className="mortgage-form">
      <header>
        <ArrowGoBack onClick={goPreviousStep} />
        <h4>5. Din arbetssituation</h4>
      </header>

      <section>
        {hasEmployer && (
          <>
            <InputField form={form} id="employment_company_name">
              <Label>Arbetsgivare</Label>
              <Input type="text" placeholder="Ex. Lendo AB" />
            </InputField>

            <div className="date-columns">
              <SelectGroup form={form} id="employment_since_year">
                <Label>Anställd sedan</Label>
                <Select>Ange året du började</Select>
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
            <Label>Yrke</Label>
            <Input type="text" placeholder="Ex. Sjuksköterska" />
          </InputField>
        )}

        {hasIncome && (
          <InputField form={form} tooltips={Tooltips} id="employment_monthly_income">
            <Label>Månadsinkomst (före skatt)</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}

        {hasPension && (
          <InputField form={form} tooltips={Tooltips} id="employment_monthly_pension">
            <Label>Livsvarig pension (före skatt)</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}

        <ToggleGroup form={form} tooltips={Tooltips} id="employment_income_in_foreign_currency">
          <Label>Har du huvudsaklig inkomst i utländsk valuta?</Label>
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
