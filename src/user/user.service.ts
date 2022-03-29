import { User } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  FindOptionsWhere,
  ObjectType,
  getRepository,
} from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  getUsers(): Promise<User[]> {
    return this.usersRepository.find({
      select: excludeColumns(User, ['password']),
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

const excludeColumns = <Entity>(
  entity: ObjectType<Entity>,
  columnsToExclude: string[],
): any =>
  getRepository(entity)
    .metadata.columns.map((column) => column.databaseName)
    .filter((columnName) => !columnsToExclude.includes(columnName));
