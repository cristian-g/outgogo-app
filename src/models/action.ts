export class Action {
    id: string;
    type: string;// 'outgo' or 'payment'
    explanation: string;
    quantity: number;
    createdAt: Date;
    formattedDate: string;
    differentDay: boolean;
    positive: boolean;
}
