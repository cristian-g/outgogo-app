import {Action} from "./action";
import {User} from "./user";

export class Payment extends Action {
  notes: string;
  am_i_owner: boolean;
  user: User;
  receiver: User;
}
