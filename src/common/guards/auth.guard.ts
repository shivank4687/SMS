import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard as PassportAuthGuard } from '@nestjs/passport';
@Injectable()
export class AuthGuard extends PassportAuthGuard(['jwt', 'google']) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      return (await super.canActivate(context)) as boolean;
    } else {
      try {
        return (await super.canActivate(context)) as boolean;
      } catch (error) {
        throw new UnauthorizedException('Invalid authentication method');
      }
    }
  }
}
