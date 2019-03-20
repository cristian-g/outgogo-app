import {Action} from "./action";

export class Payment extends Action {
  notes: string;
  am_i_owner: boolean;
}
