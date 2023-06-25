export class User {
    nick: string;
    level: number;
    image: string;

    constructor(nickname: string, level: number, image: string) {
        this.nick = nickname;
        this.level = level;
        this.image = image;
    }
}