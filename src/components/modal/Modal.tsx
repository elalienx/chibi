export default function Modal() {
  return (
    <div className="modal">
      <button type="button" onClick={() => alert("Close modal")}>
        ❎
      </button>
      <div className="content">Hello world</div>
    </div>
  );
}
