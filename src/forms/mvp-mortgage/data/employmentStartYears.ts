// Properties
const currentYear = new Date().getFullYear();
const oldestYear = 1950;

/** Used in the employment start date ("Anställd sedan") of Steps 5 and 6. */
const employmentStartYears = Array.from({ length: currentYear - oldestYear + 1 }, (_, index) => currentYear - index);

export default employmentStartYears;
