import { HttpException } from '@nestjs/common';
import { RequestError } from './request-error';

export class ExtendedHttpException extends HttpException {

    constructor(error: RequestError, logMessage: string, response: string | Record<string, any>, status: number) {
        console.error(logMessage, error);
        super(response, status);
    }
}
