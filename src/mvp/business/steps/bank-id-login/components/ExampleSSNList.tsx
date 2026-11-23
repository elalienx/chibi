// Node modules
import type { ReactElement } from "react";

// Project files
import Icon from "components/icon/Icon";
import exampleSSNs from "../exampleSSNs";
import "./example-ssn-list.css";

interface Props {
  /** The method to call when an example SSN is clicked. */
  onSelect: (ssn: string) => void;
}

export default function ExampleSSNList({ onSelect }: Props): ReactElement {
  // Properties
  const { MULTIPLE_PUBLIC_COMPANIES, SINGLE_PUBLIC_COMPANY, SOLE_TRADER } = exampleSSNs;

  return (
    <div id="example-ssn-list">
      <h4>Example SSN</h4>
      <ul className="check-list">
        <li>
          <Icon name="circle-check" /> Multiple public companies:{" "}
          <button type="button" className="example-ssn" onClick={() => onSelect(MULTIPLE_PUBLIC_COMPANIES)}>
            {MULTIPLE_PUBLIC_COMPANIES}
          </button>
        </li>
        <li>
          <Icon name="circle-check" /> Single public company:{" "}
          <button type="button" className="example-ssn" onClick={() => onSelect(SINGLE_PUBLIC_COMPANY)}>
            {SINGLE_PUBLIC_COMPANY}
          </button>
        </li>
        <li>
          <Icon name="circle-check" /> Sole trader:{" "}
          <button type="button" className="example-ssn" onClick={() => onSelect(SOLE_TRADER)}>
            {SOLE_TRADER}
          </button>
        </li>
      </ul>
    </div>
  );
}
