import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // No arguments to catch all exceptions
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR; // Default to 500 for non-HTTP exceptions
    let message = 'Internal Server Error';

    // Handle HttpException (NestJS built-in HTTP exceptions)
    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    }
    // Handle other types of exceptions (e.g., TypeError, ReferenceError, etc.)
    else if (exception instanceof Error) {
      message = exception.message;
    }

    // Log the exception (optional)
    // console.error(`Exception caught by AllExceptionsFilter:`, exception);

    // Send a consistent error response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message,
    });
  }
}


// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: Error, host: ArgumentsHost) {
//     const ctx = host.switchToHttp();
//     const response = ctx.getResponse<Response>();
//     const request = ctx.getRequest<Request>();

//     const status = 500; // Default to 500 for non-HTTP exceptions
//     response.status(status).json({
//       statusCode: status,
//       timestamp: new Date().toISOString(),
//       path: request.url,
//       message: exception.message || 'Internal Server Error',
//     });
//   }
// }