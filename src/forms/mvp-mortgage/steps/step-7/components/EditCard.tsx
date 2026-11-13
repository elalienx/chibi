// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import type Child from "../../../types/Child";
import "./edit-card.css";

interface Props {
  /** The position of the child in the household list, shown in the title as "Barn 1", "Barn 2", etc. */
  childNumber: number;

  /** The saved child information, in the same shape that ChildForm sends on save. */
  child: Child;

  /** The method to call when is time to open the sub-form. */
  onEdit: () => void;

  /** The method to call when the user removes this child. */
  onDelete: () => void;
}

export default function EditCard({ childNumber, child, onEdit, onDelete }: Props) {
  // Derived state
  const age = child.child_age === 0 ? "Under 1 år" : `${child.child_age} år`;
  const maintenance = {
    pays: "Betalar underhåll",
    receives: "Får underhåll",
    none: "Inget underhåll",
  }[child.child_maintenance];

  return (
    <div className="edit-card">
      <header>
        <h5>Barn {childNumber}</h5>
        <ButtonIcon icon="pen-to-square" name={`Ändra barn ${childNumber}`} onClick={onEdit} />
        <ButtonIcon icon="trash-xmark" name={`Ta bort barn ${childNumber}`} onClick={onDelete} variant="danger" />
      </header>

      <dl>
        <div>
          <dt>Barnets ålder</dt>
          <dd>{age}</dd>
        </div>
        <div>
          <dt>Barnbidrag/Studiebidrag</dt>
          <dd>{child.child_receives_allowance ? "Ja" : "Nej"}</dd>
        </div>
        <div>
          <dt>Bor barnet hos dig</dt>
          <dd>{child.child_lives_with_applicant ? "Ja" : "Nej"}</dd>
        </div>
        <div>
          <dt>Delad vårdnad</dt>
          <dd>{child.child_shared_custody ? "Ja" : "Nej"}</dd>
        </div>
        <div>
          <dt>Underhåll</dt>
          <dd>{maintenance}</dd>
        </div>
      </dl>
    </div>
  );
}
