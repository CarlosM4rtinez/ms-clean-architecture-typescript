import HttpStatusCode from "http-status-codes"

function responseOk(body, response) {
    return response
        .status(HttpStatusCode.OK)
        .json(body);
}

function responseCreated(body, response) {
    return response
        .status(HttpStatusCode.CREATED)
        .json(body);
}

function responseNotFound(body, response) {
    return response
        .status(HttpStatusCode.NOT_FOUND)
        .json(body);
}

function responseAccepted(body, response) {
    return response
        .status(HttpStatusCode.ACCEPTED)
        .json(body);
}

function responseBadRequest(body, response) {
    return response
        .status(HttpStatusCode.BAD_REQUEST)
        .json(body);
}

function responseNoContent(response) {
    return response.sendStatus(HttpStatusCode.NO_CONTENT);
}

export { responseOk, responseCreated, responseNotFound, responseAccepted, responseNoContent, responseBadRequest }; 