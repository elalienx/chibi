// Project files
import "./business-terms.css";

// Properties
const USER_AGREEMENT_URL = "https://se.cdn.lendocdn.com/pdf/terms_conditions_business_loans.pdf";
const PRIVACY_POLICY_URL = "https://www.lendo.se/privacy-policy/personuppgiftspolicy";

/**
 * Legal notice with links to the user agreement and privacy policy. Shown above the submit button on the last step of the Business loan form.
 */
export default function BusinessTerms() {
  return (
    <p className="business-terms">
      Genom att slutföra din ansökan godkänner du{" "}
      <a href={USER_AGREEMENT_URL} target="_blank">
        användaravtalet
      </a>{" "}
      och vår{" "}
      <a href={PRIVACY_POLICY_URL} target="_blank">
        personuppgiftspolicy
      </a>
      .
    </p>
  );
}
