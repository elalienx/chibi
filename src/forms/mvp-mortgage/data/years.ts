// Properties
const currentYear = new Date().getFullYear();

/** Every year from the current one back to 1950, newest first. */
const years = Array.from({ length: currentYear - 1950 + 1 }, (_, index) => currentYear - index);

export default years;
