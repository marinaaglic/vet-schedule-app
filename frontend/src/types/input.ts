import { ComponentPropsWithoutRef } from "react";

export type InputType = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;
