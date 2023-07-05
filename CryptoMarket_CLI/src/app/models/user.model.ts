export class User {
    wallet: string;
    nick: string;
    level: number;
    image: string;
    lastLogin: string;
    balance: number;

    constructor(wallet: string, nickname: string, level: number, image: string, lastLogin: string, balance: number) {
        this.wallet = wallet;
        this.nick = nickname;
        this.level = level;
        this.image = image;
        this.lastLogin = lastLogin;
        this.balance = balance;
    }
}