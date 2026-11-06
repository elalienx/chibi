// Project files
import "./consumer-agency-warning.css";

// Properties
const KONSUMENTVERKET_URL = "https://www.konsumentverket.se/";

/**
 * Legal warning about the cost of borrowing. Shown below the footer on the steps of the Consumer loan form.
 */
export default function ConsumerAgencyWarning() {
  return (
    <aside className="consumer-agency-warning">
      <img alt="" src="/images/consumer-agency-warning.svg" />
      <div>
        <strong>Att låna kostar pengar!</strong>
        <p>
          Om du inte kan betala tillbaka skulden i tid riskerar du en betalningsanmärkning. Det kan leda till
          svårigheter att få hyra bostad, teckna abonnemang och få nya lån. För stöd, vänd dig till budget- och
          skuldrådgivningen i din kommun. Kontaktuppgifter finns på{" "}
          <a href={KONSUMENTVERKET_URL} target="_blank">
            konsumentverket.se
          </a>
        </p>
      </div>
    </aside>
  );
}
