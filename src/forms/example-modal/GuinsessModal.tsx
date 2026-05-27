// Project files
import Button from "components/button/Button";
import Icon from "components/icon/Icon";
import useModal from "state/useModal";
import "./guiness-modal.css";

// This is a impure component.
// It requires to import the Global store to work properly
export default function GuinessModal() {
  // Global state
  const { closeModal } = useModal();

  return (
    <div className="modal guiness-modal">
      <header>
        <span>🍺</span>
        <h4>About Guiness!</h4>
      </header>

      <section>
        <p>
          Guinness is a world-renowned Irish dry stout, founded by Arthur Guinness in 1759 at St. James's Gate, Dublin.
        </p>
        <p>It is distinguished by:</p>
        <ul>
          <li>Its dark ruby-red color.</li>
          <li>Thick creamy head.</li>
          <li>Flavor achieved by roasting unmalted barley.</li>
        </ul>
        <p>
          Learn more about Guiness at{" "}
          <a href="https://www.guinness.com" target="_blank">
            Guiness.com
          </a>
        </p>
      </section>

      <hr />

      <footer>
        <Button type="button" onClick={closeModal}>
          Close
          <Icon name="x-mark" />
        </Button>
      </footer>
    </div>
  );
}
