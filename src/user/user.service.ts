import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOptionsWhere,
  ObjectType,
  getRepository,
} from 'typeorm';

import * as dbUtils from 'src/utils/db';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({
      select: dbUtils.excludeColumns(User, ['password']),
    });
  }

  async addUser(user): Promise<User> {
    await this.usersRepository.insert(user);
    return user;
  }

  async findOneBy(
    userCriteria: FindOptionsWhere<User>,
    option: { skipPassword?: boolean } = { skipPassword: false },
  ): Promise<User> {
    const result = await this.usersRepository.findOneBy(userCriteria);

    if (result) {
      if (option.skipPassword) {
        delete result.password;
      }
    }

    return result;
  }
}
