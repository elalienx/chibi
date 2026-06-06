const loanPurposes = [
  { value: "cashFlow", label: "Generell likviditet/kassaflöde" },
  { value: "investmentSeason", label: "Investering säsong" },
  { value: "purchaseInventory", label: "Inköp av lager" },
  { value: "purchaseEquipment", label: "Inköp av maskiner/utrustning" },
  { value: "refurbishment", label: "Renovering av lokal" },
  { value: "propertyAcquisition", label: "Fastighetsförvärv" },
  { value: "marketing", label: "Hemsida/marknadsföring" },
  { value: "permitApplication", label: "Tillståndsansökan" },
  { value: "unexpectedExpenses", label: "Oväntade utgifter" },
  { value: "expansion", label: "Omformation/expansion" },
  { value: "financeDebt", label: "Finansiera skuld" },
  { value: "hiring", label: "Anställa personal" },
  { value: "acquisition", label: "Förvärv" },
  { value: "other", label: "Övrigt" },
] as const;

export default loanPurposes;
