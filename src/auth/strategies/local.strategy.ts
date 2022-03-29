import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    try {
      const user = await this.authService.validateUser(username, password);
      return user;
    } catch (status) {
      let message = 'Unknown';
      if (status === HttpStatus.NOT_FOUND) {
        message = 'User not exist';
      } else if (status === HttpStatus.UNAUTHORIZED) {
        message = 'Password wrong';
      }

      throw new HttpException({ message }, status);
    }
  }
}
