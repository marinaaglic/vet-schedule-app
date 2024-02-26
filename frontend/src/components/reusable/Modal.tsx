import { ModalProps } from "../../types/modal";
import "../../styles/_modal.scss";

export default function Modal({
  open,
  onClose,
  onDelete,
  children,
}: ModalProps) {
  return (
    <div
      className={`${"modal"} ${open ? "display-block" : "display-none"}`}
      onClick={onClose}
    >
      <div className="modal-main">
        <div className="modal-head">
          <h2>Delete Appointment</h2>
        </div>
        <div className="modal-body">{children}</div>
        <div className="btn-container">
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-delete" onClick={onDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
