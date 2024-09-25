import { ReactNode } from "react";

export interface ModalProps {
  title: string;
  children: ReactNode;
  buttonText?: string;
  open: boolean;
  onClose: () => void;
  onAction: () => void;
}
