// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import type { Item } from "./SubForm";
import "./view-card.css";

interface Props {
  /** The saved item, in the same shape that SubForm sends on save. */
  item: Item;

  /** Opens the sub-form to edit this item. */
  onEdit: () => void;

  /** Removes this item from the list. */
  onDelete: () => void;
}

export default function ViewCard({ item, onEdit, onDelete }: Props) {
  // Derived state
  const name = item.employee_name;

  return (
    <article className="view-card">
      <span className="name">{name}</span>
      <ButtonIcon icon="pen-to-square" name={`Edit ${name}`} onClick={onEdit} />
      <ButtonIcon icon="trash-xmark" name={`Delete ${name}`} onClick={onDelete} variant="danger" />
    </article>
  );
}
