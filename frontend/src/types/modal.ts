import { ReactNode } from "react";

export interface ModalProps {
  title: string;
  divText: ReactNode;
  buttonText: string;
  open: boolean;
  onClose: () => void;
  onAction: () => void;
}
