// Project files
import preview from "../../../.storybook/preview";
import Button from "components/button/Button";
import Modal from "./Modal";
import useModal from "state/useModal";

// Metadata
const meta = preview.meta({
  title: "Components/Modal",
  component: Modal,
});

// Components
interface Props {
  /** The method to execute when pressing the close button. */
  closeModal: () => void;
}

function BasicModal({ closeModal }: Props) {
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
    const setModal = useModal((state: any) => state.setModal);
    const closeModal = useModal((state: any) => state.closeModal);

    return (
      <div>
        <Button onClick={() => setModal(<BasicModal closeModal={closeModal} />)}>Open modal</Button>

        {/* This component should be at the root of each app */}
        <Modal />
      </div>
    );
  },
});
