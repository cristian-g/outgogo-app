import {Action} from "./action";
import {User} from "./user";

export class Consumption extends Action {
  category: string;
  description: string;
  notes: string;
  share_consumption: boolean;
  am_i_owner: boolean;
  distributions: Array<Consumption>;
  user: User;
  receiver: User;
  gas_liters: number;
  gas_price: number;
}
