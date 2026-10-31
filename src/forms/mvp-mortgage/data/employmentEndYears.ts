// Properties
const currentYear = new Date().getFullYear();
const yearsAhead = 10;

/** Used in the employment end date ("Anställd till") of temporary and substitute employments in Step 5. */
const employmentEndYears = Array.from({ length: yearsAhead + 1 }, (_, index) => currentYear + index);

export default employmentEndYears;
