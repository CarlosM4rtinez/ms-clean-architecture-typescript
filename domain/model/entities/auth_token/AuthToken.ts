export default class AuthToken {
    secretKey: string;
    expirationDate: Date;

    constructor(secretKey: string, expirationDate: Date) {
        this.secretKey = secretKey;
        this.expirationDate = expirationDate;
    }
}
