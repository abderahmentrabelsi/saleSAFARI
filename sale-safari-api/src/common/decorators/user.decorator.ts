import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const token = request.headers.authorization.split(' ')[1];
    const decoded: any = jwt.decode(token);
    return data ? decoded[data] : decoded;
  },
);

// Usage:
// @User('sub') sub: string, @User('preferred_username') username: string
