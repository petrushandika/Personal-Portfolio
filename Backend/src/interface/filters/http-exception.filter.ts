import { type ArgumentsHost, Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';
import pino from 'pino';

const logger = pino({ name: 'HttpExceptionFilter' });

@Catch(HttpException)
export class HttpExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      success: false,
      error: {
        statusCode: status,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as Record<string, unknown>).message,
        error: HttpStatus[status],
        timestamp: new Date().toISOString(),
        path: request.url,
      },
    };

    logger.error({
      statusCode: status,
      message: exception.message,
      path: request.url,
      method: request.method,
    });

    response.status(status).json(errorResponse);
  }
}
