// eslint-disable-next-line no-shadow
export enum TransactionType {
  PAYMENT = 'PAYMENT',
  RECEIVE = 'RECEIVE',
  TRANSFERENCY = 'TRANSFERENCY',
}

// eslint-disable-next-line no-shadow
export enum TransactionIcon {
  PAYMENT = '/img/money_button.svg',
  RECEIVE = '/img/revenue_button.svg',
  TRANSFERENCY = '/img/transfer_button.svg',
}

export interface Transaction {
  type?: TransactionType;
  title: string;
  currency: string;
  value: number;
  id?: number;
}
