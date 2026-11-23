// Main applicant
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

// Footer
const BankID = (
  <div className="tooltip-with-title">
    <h5>Identifiering med BankID</h5>
    <p>
      För din och bankens säkerhet ber vi dig identifiera dig med BankID. Detta förhindrar att någon obehörig använder
      sig av dina uppgifter. Du skickar inte in din ansökan i detta steg.
    </p>
  </div>
);

/** All the possible tooltips available in this step. */
const Tooltips = {
  main_children_under_21: MainChildrenUnder21,
  co_ssn: CoSSN,
  co_children_under_21: CoChildrenUnder21,
  bank_id: BankID,
};

export default Tooltips;
