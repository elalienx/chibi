const LastYearTurnOver = (
  <>
    <h5>Omsättning de senaste 12 månaderna</h5>
    <p>
      Uppskatta bolagets omsättning under de senaste 12 månaderna. Detta hjälper långivarna att ge er ett mer konkret
      erbjudande.
    </p>
  </>
);

/** All the possible tooltips hints available in this step. */
const Hints = {
  has_existing_loans: "",
  last_year_turnover: LastYearTurnOver,
  loan_debt: "Räkna samman bolagets totala låneskuld",
  loan_purpose: "",
};

export default Hints;
