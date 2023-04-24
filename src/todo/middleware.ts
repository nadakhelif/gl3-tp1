import { Injectable, NestMiddleware } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { Request, NextFunction, Response } from 'express';

interface UserRequest extends Request {
  user: string;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'] as string;
    if (!token) {
      return res.status(401).json({ message: 'Please sign in' });
    }

    try {
      const decodedToken = jwt.verify(token.toString(), 'nada1234');
      console.log(decodedToken);

      console.log(decodedToken['userId']);
      if (!decodedToken['userId']) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req['userId'] = decodedToken['userId'];
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
