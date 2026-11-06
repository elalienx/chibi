// Project files
import type Application from "../types/Application";

const initialApplication: Application = {
  // Step 2: Co-applicant
  has_co_applicant: false,

  // Step 3: Main applicant personal info
  main_children_under_21: undefined,
  main_civil_state: "",
  main_email: "",
  main_phone: "",
  main_ssn: "",

  // Step 3: Co-applicant personal info
  co_children_under_21: undefined,
  co_civil_state: "",
  co_email: "",
  co_phone: "",
  co_ssn: "",
};

export default initialApplication;
