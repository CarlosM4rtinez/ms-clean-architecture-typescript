import {Controller, Get} from "@nestjs/common";
import CreateAuthorizationTokenUsecase from "../../../../../../../domain/usecase/auth_token/createAuthorizationTokenUsecase";

@Controller("/api/v1/channel/auth-token")
export class AuthTokenController {
    createAuthorizationTokenUsecase: CreateAuthorizationTokenUsecase;

    constructor(createAuthorizationTokenUsecase: CreateAuthorizationTokenUsecase) {
        this.createAuthorizationTokenUsecase = createAuthorizationTokenUsecase;
    }

    @Get()
    async create() {
        return "hola!";
    }
}
