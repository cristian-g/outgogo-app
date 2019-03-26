import {Action} from "./action";
import {User} from "./user";

export class Outgo extends Action {
  category: string;
  description: string;
  notes: string;
  share_outgo: boolean;
  am_i_owner: boolean;
  distributions: Array<Outgo>;
  user: User;
  receiver: User;
}
