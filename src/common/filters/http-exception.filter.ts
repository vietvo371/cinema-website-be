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

    if (exception instanceof HttpException) {
      const exceptionResponse = exception.getResponse() as any;
      
      if (exception instanceof BadRequestException) {
        message = 'Validation failed';
        if (Array.isArray(exceptionResponse.message)) {
          // Convert array of validation errors to object with field names
          errors = exceptionResponse.message.reduce((acc: Record<string, string[]>, error: string) => {
            const field = error.split(' ')[0].toLowerCase(); // Get field name from error message
            if (!acc[field]) {
              acc[field] = [];
            }
            acc[field].push(error);
            return acc;
          }, {});
        } else if (typeof exceptionResponse.message === 'object') {
          // If it's already an object, use it directly
          errors = exceptionResponse.message;
        } else {
          // If it's a string, wrap it in a general error
          errors = { general: [exceptionResponse.message] };
        }
      } else {
        message = exception.message;
      }
    }

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