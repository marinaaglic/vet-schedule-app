import { User } from "./user.ts";

export interface Pet {
  name: string;
  type: string;
  breed: string;
  owner: User;
}
