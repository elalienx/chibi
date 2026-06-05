// Project files
import type { Step } from "../types/Step";

interface Props {
  /** Allows a button to change what step to display. */
  setStep: (step: Step) => void;
}

export default function Success({ setStep }) {
  return <div className="business-form">hello</div>;
}
