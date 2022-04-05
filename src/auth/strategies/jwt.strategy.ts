import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const { secret, ignoreExpiration } = configService.get('auth');
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bear'),
      ignoreExpiration,
      secretOrKey: secret,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
