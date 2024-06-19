import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as morgan from 'morgan';
import { LoggerService } from '../logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private morgan: any;

  constructor(private readonly loggerService: LoggerService) {
    this.morgan = morgan((tokens, req, res) => {
      const log = [
        tokens.date(req, res, 'iso'),
        tokens['remote-addr'](req, res),
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res) + ' ms',
      ].join(' ');
      this.loggerService.log(log);
      return null;
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.morgan(req, res, next);
  }
}
