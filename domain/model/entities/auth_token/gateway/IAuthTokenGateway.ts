import AuthToken from "../AuthToken";

export default interface AuthTokenGateway {
    validateAuthorizationToken(token: string): Promise<boolean>;
    createAuthorizationToken(authToken: AuthToken): Promise<AuthToken>;
}
