// Main applicant
const MainSSN = (
  <div className="tooltip-with-title">
    <h5>Personnummer</h5>
    <p>Vi behöver ditt personnummer för att behandla din ansökan så att du kan få det bästa låneerbjudandet.</p>
  </div>
);

const MainChildrenUnder21 = (
  <div className="tooltip-with-title">
    <h5>Barn under 21 år</h5>
    <p>Ange hur många barn och ungdomar under 21 år som bor hemma och som du är underhållsskyldig för.</p>
  </div>
);

// Co-applicant
const CoSSN = (
  <div className="tooltip-with-title">
    <h5>Personnummer</h5>
    <p>
      Vi behöver din medsökandes personnummer för att behandla din ansökan så att du kan få det bästa låneerbjudandet.
    </p>
  </div>
);

const CoChildrenUnder21 = (
  <div className="tooltip-with-title">
    <h5>Barn under 21 år</h5>
    <p>Ange hur många barn och ungdomar under 21 år som bor hemma och som din medsökande är underhållsskyldig för.</p>
  </div>
);

/** All the possible tooltips available in this step. */
const Tooltips = {
  main_ssn: MainSSN,
  main_children_under_21: MainChildrenUnder21,
  co_ssn: CoSSN,
  co_children_under_21: CoChildrenUnder21,
};

export default Tooltips;
