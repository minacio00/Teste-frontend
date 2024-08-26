export interface Order {
    id: number;
    totalAmount: string;
    date: string;
    paymentMethod: string;
    status: string;
    orderDate: Date;
}