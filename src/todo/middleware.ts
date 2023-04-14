import { Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, NextFunction, Response } from 'express';

interface UserRequest extends Request {
  user: string;
}

@Injectable()
class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: UserRequest, res: Response, next: NextFunction) {
    const token = req.headers['auth-user'] as string;
    if (!token) {
      return res.status(401).json({ message: 'Please sign in' });
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      if (!decodedToken.userId) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decodedToken.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
