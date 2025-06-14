import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();

    // Log the full error details
    this.logger.error('Exception details:', {
      exception,
      stack: exception instanceof Error ? exception.stack : undefined,
      request: {
        method: request.method,
        url: request.url,
        body: request.body,
        headers: request.headers,
      },
    });

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message = 'Internal server error';
    let errors: Record<string, string[]> | null = null;

    const errorResponse = {
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    if (errors) {
      errorResponse['errors'] = errors;
    }

    // Always include error details in development
    if (process.env.NODE_ENV !== 'production') {
      errorResponse['error'] = {
        name: exception instanceof Error ? exception.name : 'Unknown',
        message: exception instanceof Error ? exception.message : String(exception),
        stack: exception instanceof Error ? exception.stack : undefined,
      };
    }

    response.status(status).json(errorResponse);
  }
} 