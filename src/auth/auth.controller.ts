import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import NewUserDTO from 'src/auth/dto/NewUser.dto';
import LoginUserResDTO from 'src/auth/dto/LoginUserRes.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(200)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('createUser')
  async createUser(@Body() user: NewUserDTO): Promise<LoginUserResDTO> {
    // Find email existed
    const hasUserExisted = await this.userService.findOneBy({
      username: user.username,
    });

    if (hasUserExisted) {
      throw new HttpException(
        { message: 'User already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.authService.createUser(user);
  }
}
