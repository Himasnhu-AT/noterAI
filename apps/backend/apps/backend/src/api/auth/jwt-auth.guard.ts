import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'apps/backend/custom.decorator/custom.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext): any {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    // Add your custom logic to extract the access_token from the header
    const request = context.switchToHttp().getRequest();
    const accessToken = request.headers['access_token'];

    // Set the access_token in the request for passport-jwt to use
    if (accessToken) {
      request.headers.authorization = `${accessToken}`;
    }

    return super.canActivate(context);
  }
}
