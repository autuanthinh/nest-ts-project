import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import NewUserDTO from 'src/auth/dto/NewUserDTO';
import LoginUserResDTO from 'src/auth/dto/LoginUserResDTO';
import { AppService } from './app.service';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UserService } from 'src/user/user.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
