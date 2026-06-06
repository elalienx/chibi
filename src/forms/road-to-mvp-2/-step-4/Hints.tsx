const Turnover = (
  <div className="tooltip-with-title ">
    <h5>Omsättning de senaste 12 månaderna</h5>
    <p>
      Uppskatta bolagets omsättning under de senaste 12 månaderna. Detta hjälper långivarna att ge er ett mer konkret
      erbjudande.
    </p>
  </div>
);

/** All the possible tooltips hints available in this step. */
const Hints = {
  has_existing_loans: "",
  turnover: Turnover,
  loan_debt: "Räkna samman bolagets totala låneskuld",
  purpose: "",
};

export default Hints;
