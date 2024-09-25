import { ModalProps } from "../../types/modal";
import "../../styles/_modal.scss";

export default function Modal({
  title,
  divText,
  buttonText,
  open,
  onClose,
  onAction,
}: ModalProps) {
  return (
    <div
      className={`${"modal"} ${open ? "display-block" : "display-none"}`}
      onClick={onClose}
    >
      <div className="modal-main" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h2>{title}</h2>
        </div>
        <div className="modal-body">{divText}</div>
        <div className="btn-container">
          <button type="button" className="btn-close" onClick={onClose}>
            Close
          </button>
          <button type="button" className="btn-delete" onClick={onAction}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
