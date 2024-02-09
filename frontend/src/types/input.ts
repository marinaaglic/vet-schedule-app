import { ComponentPropsWithoutRef } from "react";

export type InputType = {
  label: string;
  id: string;
  error?: string;
} & ComponentPropsWithoutRef<"input">;
