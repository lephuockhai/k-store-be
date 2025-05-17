import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    this.logger.log(`Request... ${method} ${originalUrl}`);

    res.on('finish', () => {
      if (res.statusCode >= 400) {
        this.logger.error(
          `Error: ${res.statusCode} - ${method} - ${originalUrl}`,
        );
      } else {
        this.logger.log(`${method} ${originalUrl} ${res.statusCode}`);
      }
    });
    next();
  }
}
