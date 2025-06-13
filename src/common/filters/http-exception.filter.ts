import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error('Exception details:', {
      exception,
      stack: exception instanceof Error ? exception.stack : undefined,
      request: {
        method: ctx.getRequest().method,
        url: ctx.getRequest().url,
        body: ctx.getRequest().body,
        headers: ctx.getRequest().headers,
      },
    });

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? exception.message
        : 'Internal server error';

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest().url,
      error: exception instanceof Error ? exception.message : undefined,  
    };

    if (process.env.NODE_ENV !== 'production' && !(exception instanceof HttpException)) {
      errorResponse['error'] = exception instanceof Error ? exception.message : String(exception);
    }

    response.status(status).json(errorResponse);
  }
} 