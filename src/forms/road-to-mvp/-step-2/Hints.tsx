const TenancyTypeHint = (
  <>
    <p>
      För en bostadsrätt äger du rätten att bo i bostaden, men bostadsrättsföreningen äger huset och marken där
      bostäderna finns.
    </p>
    <p>För en äganderätt däremot äger du bostaden helt och hållet själv.</p>
  </>
);

/** All the possible tooltips hints available in this step. */
const Hints = {
  monthly_fee: `Ange månadsavgiften till bostadsrättsföreningen.`,
  operating_cost: `Ange de sammanlagda kostnaderna förknippade med boendet exempelvis hemförsäkring, värme, vatten, el, mm. En uppskattning återfinns ofta i bostadens objektbeskrivning.`,
  tenancy_type: TenancyTypeHint,
  rooms: `Ange antal rum i lägenheten exklusive kök och badrum.`,
  size: "",
};

export default Hints;
