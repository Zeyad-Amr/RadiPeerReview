import { ErrorResponse } from ".";
class ErrorMessage {
    static get(msg: string): ErrorResponse {
        return {
            message: msg,
            statusCode: 0,
            path: '',
            timestamp: Date.now().toString()
        }
    }
}

export default ErrorMessage;