// Node modules
import type { ReactNode } from "react";
import type { FieldStore } from "@formisch/react";

interface Props {
  /** Unique identifier of the parent radio group to make sure only one radio option is active. */
  id?: string;

  /** Text to display inside the radio option. */
  children: ReactNode;

  /** An instance of a Formisch form. */
  field?: FieldStore;

  /** The value sent to the database. */
  value: string | number | boolean;
}

export default function Option({ id, children, field, value }: Props) {
  // Safeguards
  if (!id) return <p>Pass an id to know which field this radio belongs</p>;
  if (!field) return <p>This component requires a Formisch field</p>;

  return (
    <div>
      This component is mean to replace a radio, select, or toggle options. However for debuggin, here is what i could
      render {children} and send this to the database {value}
    </div>
  );
}
