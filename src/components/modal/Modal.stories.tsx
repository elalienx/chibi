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
const BasicModal = (
  <div className="modal" style={{ width: "320px", padding: "32px" }}>
    <h1>Hello world</h1>
    <p>
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsam suscipit eveniet sit similique illo laudantium
      perferendis quae, exercitationem officia velit non labore ullam. Neque nam vel voluptas odio laborum sequi!
    </p>
  </div>
);

// Stories
export const Default = meta.story({
  name: "Default",
  render: () => {
    const { setModal } = useModal.getState(); // Instead of useModal() to reduce re-renders

    return (
      <div>
        <Button onClick={() => setModal(BasicModal)}>Open modal</Button>

        {/* This component should be at the root of each app */}
        <Modal />
      </div>
    );
  },
});
