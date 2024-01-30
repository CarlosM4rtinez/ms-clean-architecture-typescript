import Channel from "../Channel";

export default interface ChannelGateway {
    findByAcronym(acronym: string): Promise<Channel>;
}