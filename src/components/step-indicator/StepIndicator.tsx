// Project files
import "./step-indicator.css";

interface Props {
  /** The step the user is currently on. Values bigger than `totalSteps` are displayed as `totalSteps`. */
  currentStep: number;

  /** The total amount of steps in the flow. */
  totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: Props) {
  // Safeguards
  if (totalSteps < 1) return <p>Please pass a totalSteps of 1 or more</p>;

  // Properties
  const stepWithoutOverflow = Math.min(currentStep, totalSteps);
  const step = Math.max(stepWithoutOverflow, 0);
  const progress = (step / totalSteps) * 100;

  return (
    <div
      aria-valuemax={totalSteps}
      aria-valuemin={0}
      aria-valuenow={step}
      aria-valuetext={`Steg ${step} av ${totalSteps}`}
      className="step-indicator"
      role="progressbar"
    >
      <svg aria-hidden="true" viewBox="0 0 100 100">
        {/* Gradient colors (color mask) */}
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" id="step-indicator-gradient" x1="100" x2="0" y1="0" y2="0">
            <stop className="gradient-start" offset="0" />
            <stop className="gradient-end" offset="1" />
          </linearGradient>
        </defs>

        {/* Background ring */}
        <circle className="track" cx="50" cy="50" />

        {/* Progress ring */}
        {step > 0 && (
          <circle
            className="progress"
            cx="50"
            cy="50"
            pathLength={100}
            stroke="url(#step-indicator-gradient)"
            strokeDasharray={`${progress} 100`}
            transform="rotate(-90 50 50)"
          />
        )}
      </svg>

      {/* Step numbers (example 1 / 3) */}
      <span aria-hidden="true" className="label">
        {step} / {totalSteps}
      </span>
    </div>
  );
}
