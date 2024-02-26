import { ReactNode } from "react";

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
  children: ReactNode;
}
