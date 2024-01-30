export default class Channel {

    id: number;
    name: string;
    acronym: string;
    secretKey: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number, name: string, acronym: string, secretKey: string, createdAt: Date, updatedAt: Date) {
        this.id = id;
        this.name = name;
        this.acronym = acronym;
        this.secretKey = secretKey;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
}