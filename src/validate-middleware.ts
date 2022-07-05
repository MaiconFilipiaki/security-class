import { NestMiddleware } from '@nestjs/common';
import * as word from './security/word.json';

export class ValidateCustomerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    try {
      if (JSON.stringify(req.body) !== '{}') {
        Object.keys(req.body).map((i) => {
          if (typeof req.body[i] === 'string') {
            word.word.map((e) => {
              req.body[i] = req.body[i].toUpperCase().replaceAll(e, '');
            });
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
    next();
  }
}
