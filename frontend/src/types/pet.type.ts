import { User } from "./user.type.ts";

export type Pet = {
  name: string;
  type: string;
  breed: string;
  owner: User;
};
