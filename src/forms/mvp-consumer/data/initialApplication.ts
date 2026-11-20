// Project files
import type Application from "../types/Application";

const initialApplication: Application = {
  // Step 2: Co-applicant
  has_co_applicant: false,

  // Step 3: Main applicant personal info
  main: {
    children_under_21: undefined,
    civil_state: "",
    email: "",
    phone: "",
    ssn: "",
  },

  // Step 3: Co-applicant personal info
  co: {
    children_under_21: undefined,
    civil_state: "",
    email: "",
    phone: "",
    ssn: "",
  },
};

export default initialApplication;
