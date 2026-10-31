// Properties
const currentYear = new Date().getFullYear();

/** Every year from the current one up to 10 years ahead, closest first. */
const futureYears = Array.from({ length: 10 + 1 }, (_, index) => currentYear + index);

export default futureYears;
