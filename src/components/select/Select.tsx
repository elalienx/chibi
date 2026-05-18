// Project files
import "./select.css";

export default function Select() {
  return (
    <>
      <button
        type="button"
        className="select-trigger"
        popoverTarget="select-list"
        style={{ anchorName: "--select-trigger" }}
      >
        Please choose an option
      </button>

      <div id="select-list" popover="auto" style={{ positionAnchor: "--select-trigger" }}>
        <button className="select-option">House</button>
        <button className="select-option">Apartment</button>
        <button className="select-option">Terraced house</button>
        <button className="select-option">Holiday home</button>
      </div>
    </>
  );
}
