/** A list of reasons to apply for a loan. */
const purposes = [
  { value: "purchase_equipment", label: "Maskiner & Utrustning" },
  { value: "cash_flow", label: "Likviditet" },
  { value: "finance_debt", label: "Finansiera skuld" },
  { value: "investment_season", label: "Säsongsinvestering" },
  { value: "purchase_inventory", label: "Inköp av lager" },
  { value: "expansion", label: "Förändring & Tillväxt" },
  { value: "refurbishment", label: "Renovering av lokal" },
  { value: "property_acquisition", label: "Fastighetsförvärv" },
  { value: "acquisition", label: "Förvärv" },
] as const;

export default purposes;
