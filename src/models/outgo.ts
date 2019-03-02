import {Action} from "./action";

export class Outgo extends Action {
  category: string;
  description: string;
  notes: string;
  share_outgo: boolean;
}
