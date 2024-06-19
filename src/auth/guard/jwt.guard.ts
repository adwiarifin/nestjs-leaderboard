import { AuthGuard } from '@nestjs/passport';

export class JwtGuard extends AuthGuard('jwtx') {
  constructor() {
    super();
  }
}
