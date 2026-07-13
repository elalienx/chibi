/** Matches word boundaries before groups of three digits; inserts spaces for Swedish-style thousands notation (e.g. 1000000 → 1 000 000). */
const spaceGroupingPattern: RegExp = /\B(?=(\d{3})+(?!\d))/g;

export default spaceGroupingPattern;
