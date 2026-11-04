// Properties
const currentYear = new Date().getFullYear();
const yearsAhead = 10;

/** Used in the employment end date ("Anställd till") of temporary and substitute employments in Steps 5 and 6. */
const employmentEndYears = Array.from({ length: yearsAhead + 1 }, (_, index) => currentYear + index);

export default employmentEndYears;
