// Project files
import Button from "components/button/Button";
import "./pep-info-modal.css";

interface Props {
  /** A callback to request the modal to be closed. */
  onClose: () => void;
}

/** Explains what a Politically Exposed Person (PEP) is. */
export default function PEPInfoModal({ onClose }: Props) {
  return (
    <div className="modal" id="pep-info-modal">
      <h4>Person i politisk utsatt position (PEP)</h4>
      <p>
        En person i politiskt utsatt ställning är en person som har eller har haft viktiga offentliga funktioner i en
        stat eller i en internationell organisation.
      </p>

      <section>
        <p>
          <strong>Exempel på personer i politiskt utsatt ställning</strong>
        </p>
        <div className="columns">
          <ul>
            <li>Statschefen</li>
            <li>Riksdagsledamöter</li>
            <li>Statsministern och övriga ministrar i regeringskansliet</li>
            <li>Domare i Högsta domstolen och Högsta förvaltningsdomstolen</li>
            <li>Riksrevisorerna</li>
            <li>Riksbankens direktion</li>
          </ul>
          <ul>
            <li>Höga officerare (general, generallöjtnant, generalmajor, amiral, viceamiral och konteramiral)</li>
            <li>VD eller styrelseledamot i statsägda företag</li>
            <li>
              Person i ledningen i en internationell organisation (styrelseledamöter, generalsekreterare med flera)
            </li>
            <li>Ledamot i politiskt partis styrelse</li>
          </ul>
        </div>
      </section>

      <section>
        <p>
          <strong>Familjemedlemmar och medarbetare omfattas också</strong>
        </p>
        <p>
          Banken måste också veta vilka kunder som är familjemedlemmar och kända medarbetare till en person i politiskt
          utsatt ställning.
        </p>
        <div className="columns">
          <ul>
            <li>Maka/make, registrerad partner, sambo</li>
            <li>Barn och deras make/maka, registrerade partner eller sambo</li>
          </ul>
          <ul>
            <li>Föräldrar</li>
          </ul>
        </div>
        <p>Har du övriga frågor på detta kan du kontakta vår kundtjänst.</p>
      </section>

      <Button onClick={onClose}>Stäng</Button>
    </div>
  );
}
