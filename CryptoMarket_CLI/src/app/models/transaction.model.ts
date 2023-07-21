export class Transaction {
    id?: number;
    type?: number;
    fromWallet?: string;
    toWallet?: string;
    amount: number;
    date?: Date;
    message?: string;
    signature?: string;
    signedPayload?: string;

    constructor(
        id: number,
        type: number,
        amount: number,
        date?: Date,
        fromWallet?: string,
        toWallet?: string,
        message?: string
      ) {
        this.id = id;
        this.type = type;
        this.amount = amount;
        this.date = date;
        this.fromWallet = fromWallet;
        this.toWallet = toWallet;
        this.message = message;
      }
  }
  