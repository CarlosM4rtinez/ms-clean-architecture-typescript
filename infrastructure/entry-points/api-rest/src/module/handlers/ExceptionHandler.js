import HttpStatusCode from "http-status-codes"
import TechnicalException from "../../../../../../domain/model/common/exception/TechnicalException.js";
import BusinessException from "../../../../../../domain/model/common/exception/BusinessException.js";
import ErrorDTO from "../commons/dto/ErrorDTO.js";
import { TechnicalMessage } from "../../../../../../domain/model/common/exception/message/TechnicalMessage.js"
import logger from "../../../../../helpers/logger/src/Logger.js";
import LogData from "../../../../../helpers/logger/src/LogData.js";

export default function exceptionHandler(exception, request, response, next) {
    const data = getDataFromException(exception);
    const errorResponse = buildErrorResponse(response, data.status, data.error);
    logger.error(new LogData(request, errorResponse, exception, data.error));
    return errorResponse;
}

function getDataFromException(exception) {
    switch (exception.constructor) {
        case TechnicalException:
            return { error: buildErrorDTO(exception), status: HttpStatusCode.INTERNAL_SERVER_ERROR }
        case BusinessException:
            return { error: buildBusinessErrorDTO(exception), status: HttpStatusCode.CONFLICT }
        default:
            return { error: buildDefaultErrorDTO(exception), status: HttpStatusCode.INTERNAL_SERVER_ERROR }
    }
}

function buildErrorDTO(exception) {
    return new ErrorDTO(exception.getCode(), exception.getDomainMessage(), exception.message);
}

function buildBusinessErrorDTO(exception) {
    const message = `${exception.message}${exception.message.endsWith('.') ? "" : "."}`;
    const detail = exception.getDetail() ? `${message} Detail: ${exception.getDetail()}` : exception.message;
    return new ErrorDTO(exception.getCode(), exception.getDomainMessage(), detail);
}

function buildDefaultErrorDTO(exception) {
    return new ErrorDTO(TechnicalMessage.MST000.code, TechnicalMessage.MST000.message, exception.message)
}

function buildErrorResponse(response, httpStatusCode, error) {
    return response
        .status(httpStatusCode)
        .send(error);
}