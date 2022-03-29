import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/user.entity';

import ITokenPayload from 'src/models/interface/TokenPayload.i';
import LoginUserReqDTO from 'src/auth/dto/LoginUserReq.dto';
import LoginUserResDTO from 'src/auth/dto/LoginUserRes.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findOneBy({ username });

    if (user) {
      const isValid = await bcrypt.compare(password, user.password);
      if (isValid) {
        return user;
      } else {
        throw HttpStatus.UNAUTHORIZED;
      }
    } else {
      throw HttpStatus.NOT_FOUND;
    }
  }

  async login(user: User): Promise<LoginUserResDTO> {
    const payload: ITokenPayload = { id: user.id, username: user.username };
    return {
      ...payload,
      token: this.jwtService.sign(payload),
    };
  }

  async createUser(req: LoginUserReqDTO): Promise<LoginUserResDTO> {
    // generate salt to hash password
    const salt = await bcrypt.genSalt(10);
    // now we set user password to hashed password
    const hash = await bcrypt.hash(req.password, salt);

    // created at
    const createAt = new Date();

    const newUser = new User();
    newUser.username = req.username;
    newUser.password = hash;
    newUser.create_at = createAt;
    newUser.update_at = createAt;

    await this.usersService.addUser(newUser);

    return await this.login(newUser);
  }
}
