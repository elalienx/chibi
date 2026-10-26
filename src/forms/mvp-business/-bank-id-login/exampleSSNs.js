/** Test personnummer to simulate the different BankID login outcomes. */
const exampleSSNs = {
  MULTIPLE_PUBLIC_COMPANIES: "197810196597",
  SINGLE_PUBLIC_COMPANY: "197604261136",
  SOLE_TRADER: "194207073091",
} as const;

export default exampleSSNs;
