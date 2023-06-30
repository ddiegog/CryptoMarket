export class User {
    wallet: string;
    nick: string;
    level: number;
    image: string;

    constructor(wallet: string, nickname: string, level: number, image: string) {
        this.wallet = wallet;
        this.nick = nickname;
        this.level = level;
        this.image = image;
    }
}