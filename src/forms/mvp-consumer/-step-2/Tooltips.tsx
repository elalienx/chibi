const CoApplicant = (
  <div className="tooltip-with-title">
    <h5>Medsökande</h5>
    <p>
      Medsökande är en person som tillsammans med dig står på lånet, kan exempelvis vara en sambo eller annan
      familjemedlem.
    </p>
  </div>
);

/** All the possible tooltips available in this step. */
const Tooltips = {
  has_co_applicant: CoApplicant,
};

export default Tooltips;
