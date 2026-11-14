// Project files
import "./business-terms.css";

/**
 * Legal notice with links to the user agreement and privacy policy. Shown above the submit button on the last step of the Business loan form.
 */
export default function BusinessTerms() {
  // Components
  const UserAgreement = (
    <a href="https://se.cdn.lendocdn.com/pdf/terms_conditions_business_loans.pdf" target="_blank">
      användaravtalet
    </a>
  );
  const PrivacyPolicy = (
    <a href="https://www.lendo.se/privacy-policy/personuppgiftspolicy" target="_blank">
      personuppgiftspolicy
    </a>
  );

  return (
    <p className="business-terms">
      Genom att slutföra din ansökan godkänner du {UserAgreement} och vår {PrivacyPolicy}.
    </p>
  );
}
