// Project files
import preview from "../../../.storybook/preview";
import Button from "components/button/Button";
import ModalManager from "./ModalManager";
import useModal from "state/useModal";

// Metadata
const meta = preview.meta({
  title: "Components/Modal Manager",
  component: ModalManager,
});

// Components
interface Props {
  /** The method to execute when pressing the close button. */
  closeModal: () => void;
}

function BasicModal({ closeModal }: Props) {
  // Derived state
  const style = { width: "320px", padding: "32px", display: "flex", flexDirection: "column", gap: "16px" } as const;

  return (
    <div className="modal" style={style}>
      <h1>Hello world</h1>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam suscipit eveniet sit similique illo laudantium
        perferendis quae, exercitationem officia velit non labore ullam. Neque nam vel voluptas odio laborum sequi!
      </p>
      <Button onClick={closeModal}>Close me</Button>
    </div>
  );
}

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => {
    // Global state
    const { setModal, closeModal } = useModal.getState(); // Instead of useModal() to reduce re-renders

    return (
      <div>
        <Button onClick={() => setModal(<BasicModal closeModal={closeModal} />)}>Open modal</Button>

        {/* This component should be at the root of each app */}
        <ModalManager />
      </div>
    );
  },
});
