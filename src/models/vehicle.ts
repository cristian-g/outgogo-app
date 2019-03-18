import {Action} from "./action";

export class Vehicle {
    id: string;
    brand: string;
    model: string;
    year: number;
    price: number;
    key: string;
    emails: Array<String>;
    actions: Array<Action>;
}
