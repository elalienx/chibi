export default function BankIDTooltip() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-base)" }}>
      <h5>Identifiering med BankID</h5>
      <p>
        För din och bankens säkerhet ber vi dig logga in med ditt BankID. Detta förhindrar att någon obehörig använder
        sig av dina uppgifter. Du skickar inte in din ansökan i detta steg.
      </p>
    </div>
  );
}
