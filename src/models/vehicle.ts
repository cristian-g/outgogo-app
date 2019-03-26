import {Action} from "./action";
import {FinancialStatus} from "./financialStatus";
import {User} from "./user";

export class Vehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    key: string;
    emails: Array<String>;
    actions: Array<Action>;
    balance: number;
    balances: Array<FinancialStatus>;
    sharing_status: string;
    am_i_owner: boolean;
    users: Array<User>;
}
