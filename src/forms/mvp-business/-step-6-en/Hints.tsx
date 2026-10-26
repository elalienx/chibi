const BlancoLoans = (
  <div className="tooltip-with-title">
    <h5>Blancolån</h5>
    <p>Om du har några privata blancolån anger du den uppskattade totala skulden.</p>
  </div>
);

const InstallmentLoans = (
  <div className="tooltip-with-title">
    <h5>Avbetalningskrediter</h5>
    <p>
      Om du har några privata avbetalningskrediter som till exempel utnyttjade kreditkort eller billån anger du den
      uppskattade totala skulden.
    </p>
  </div>
);

const Hints = {
  blanco_loans: BlancoLoans,
  installment_loans: InstallmentLoans,
};

export default Hints;
