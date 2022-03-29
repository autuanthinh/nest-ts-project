import { UserService } from './user.service';
import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers() {
    return this.userService.getUsers();
  }
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: number) {
    return this.userService.findOneBy({ id }, { skipPassword: true });
  }
}
