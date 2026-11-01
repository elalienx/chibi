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
import ToggleGroup from "components/toggle-group/ToggleGroup";
import ToggleOption from "components/toggle-option/ToggleOption";
import ValidationMessage from "components/validation-message/ValidationMessage";
import cleanInitialInput from "helpers/cleanInitialInput";
import useApplication from "../state/useApplication";
import useFormNavigation from "../state/useFormNavigation";
import EndMonthOptions from "./components/EndMonthOptions";
import EndYearOptions from "./components/EndYearOptions";
import StartMonthOptions from "./components/StartMonthOptions";
import StartYearOptions from "./components/StartYearOptions";
import clearUnusedEmploymentFields from "./helpers/clearUnusedEmploymentFields";
import getEmploymentFields from "./helpers/getEmploymentFields";
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
    initialInput: cleanInitialInput({ input: application, treatZeroAsEmpty: true }),
  });

  // Derived state
  const { hasEmployer, hasEndDate, hasPension, hasProfession, hasIncome } = getEmploymentFields(employmentType);
  const startYear = hasEmployer ? Number(getInput(form, { path: ["main_employment_since_year"] })) : 0;
  const hasForeignIncome = getInput(form, { path: ["main_employment_income_in_foreign_currency"] }) === "true";

  // Methods
  function submitForm(values: object) {
    const employmentFields = clearUnusedEmploymentFields(employmentType);

    updateApplication({ ...employmentFields, ...values });
    setStep(application.has_co_applicant ? "step-6" : "success-step");
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
            <InputField form={form} id="main_employment_company_name">
              <Label>Arbetsgivare</Label>
              <Input type="text" placeholder="Ex. Lendo AB" />
            </InputField>

            <div className="date-columns">
              <SelectGroup form={form} id="main_employment_since_year">
                <Label>Anställd sedan</Label>
                <Select>Ange året du började</Select>
                {StartYearOptions()}
              </SelectGroup>

              <SelectGroup form={form} id="main_employment_since_month">
                <Label>Anställd sedan, månad</Label>
                <Select>Ange månad</Select>
                {StartMonthOptions(startYear)}
              </SelectGroup>
            </div>
          </>
        )}

        {hasEndDate && (
          <div className="date-columns">
            <SelectGroup form={form} id="main_employment_to_year">
              <Label>Anställd till</Label>
              <Select>Ange år</Select>
              {EndYearOptions()}
            </SelectGroup>

            <SelectGroup form={form} id="main_employment_to_month">
              <Label>Anställd till, månad</Label>
              <Select>Ange månad</Select>
              {EndMonthOptions()}
            </SelectGroup>
          </div>
        )}

        {hasProfession && (
          <InputField form={form} id="main_employment_profession">
            <Label>Yrke</Label>
            <Input type="text" placeholder="Ex. Sjuksköterska" />
          </InputField>
        )}

        {hasIncome && (
          <InputField form={form} tooltips={Tooltips} id="main_employment_monthly_income">
            <Label>Månadsinkomst (före skatt)</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}

        {hasPension && (
          <InputField form={form} tooltips={Tooltips} id="main_employment_monthly_pension">
            <Label>Livsvarig pension (före skatt)</Label>
            <Input type="number" suffix="kr" />
          </InputField>
        )}

        <ToggleGroup form={form} tooltips={Tooltips} id="main_employment_income_in_foreign_currency">
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
