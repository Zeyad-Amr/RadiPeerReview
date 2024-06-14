class ErrorCodes {
    static readonly success = 200;
    static readonly created = 201;
    static readonly accepted = 202;
    static readonly noContent = 204;
    static readonly badRequest = 400;
    static readonly unauthorized = 401;
    static readonly forbidden = 403;
    static readonly notFound = 404;
    static readonly methodNotAllowed = 405;
    static readonly notAcceptable = 406;
    static readonly requestTimeout = 408;
    static readonly conflict = 409;
    static readonly gone = 410;
    static readonly unprocessableEntity = 422;
    static readonly internalServerError = 500;
    static readonly notImplemented = 501;
    static readonly badGateway = 502;
    static readonly serviceUnavailable = 503;
    static readonly gatewayTimeout = 504;

    static readonly codes: any = {
        200: 'success',
        201: 'created',
        202: 'accepted',
        204: 'noContent',
        400: 'badRequest',
        401: 'unauthorized',
        403: 'forbidden',
        404: 'notFound',
        405: 'methodNotAllowed',
        406: 'notAcceptable',
        408: 'requestTimeout',
        409: 'conflict',
        410: 'gone',
        422: 'unprocessableEntity',
        500: 'internalServerError',
        501: 'notImplemented',
        502: 'badGateway',
        503: 'serviceUnavailable',
        504: 'gatewayTimeout',
    };

    static get(code: number): string {
        if (this.codes[code]) {
            return this.codes[code];
        } else {
            return 'unknown error';
        }
    }
}

export default ErrorCodes;