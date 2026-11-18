// Project files
import type Applicant from "../types/Applicant";
import type Application from "../types/Application";

const emptyApplicant: Applicant = {
  children_under_21: undefined,
  civil_state: "",
  email: "",
  phone: "",
  ssn: "",
};

const initialApplication: Application = {
  // Step 2: Co-applicant
  has_co_applicant: false,

  // Step 3: Personal info
  main: emptyApplicant,
  co: emptyApplicant,
};

export default initialApplication;
