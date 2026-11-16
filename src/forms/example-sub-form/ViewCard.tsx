// Project files
import ButtonIcon from "components/button-icon/ButtonIcon";
import "./view-card.css";

interface Props {
  /** The text to display on the card and in the button labels. */
  title: string;

  /** Opens the sub-form to edit this item. */
  onEdit: () => void;

  /** Removes this item from the list. */
  onDelete: () => void;
}

export default function ViewCard({ title, onEdit, onDelete }: Props) {
  return (
    <article className="view-card">
      <span className="name">{title}</span>
      <ButtonIcon icon="pen-to-square" name={`Edit ${title}`} onClick={onEdit} />
      <ButtonIcon icon="trash-xmark" name={`Delete ${title}`} onClick={onDelete} variant="danger" />
    </article>
  );
}
