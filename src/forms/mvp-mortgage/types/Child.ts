/** One child in the household, as saved by the Step 7 child form. */
export default interface Child {
  child_age: number;
  child_receives_allowance: boolean;
  child_lives_with_applicant: boolean;
  child_shared_custody: boolean;
  child_maintenance: "pays" | "receives" | "none";
}
