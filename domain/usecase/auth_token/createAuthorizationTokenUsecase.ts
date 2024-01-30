import AuthTokenGateway from "../../model/entities/auth_token/gateway/IAuthTokenGateway";
import AuthToken from "../../model/entities/auth_token/AuthToken";
import ChannelGateway from "../../model/entities/channel/gateway/IChannelGateway";

export default class CreateAuthorizationTokenUsecase {
    authTokenGateway: AuthTokenGateway;
    channelGateway: ChannelGateway;

    constructor(authTokenGateway: AuthTokenGateway, channelGateway: ChannelGateway) {
        this.authTokenGateway = authTokenGateway;
        this.channelGateway = channelGateway;
    }

    async run(): Promise<string> {
        return "hello";
    }
}
