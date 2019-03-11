export class Action {
    id: string;
    type: string;// 'outgo' or 'payment'
    quantity: number;
    createdAt: Date;
    formattedDate: string;
    differentDay: boolean;
}
