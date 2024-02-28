export interface ModalProps {
  title: string;
  divText: string;
  buttonText: string;
  open: boolean;
  onClose: () => void;
  onAction: () => void;
}
