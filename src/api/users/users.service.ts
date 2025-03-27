import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../../database/entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { FindUserDTO } from './dto/find-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  private async findUserByCriteria(
    criteria: Partial<User>,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: Object.entries(criteria).map(([key, value]) => ({ [key]: value })),
    });
  }

  private async validateUserExists(
    email: string,
    username: string,
  ): Promise<void> {
    const existingUser = await this.findUserByCriteria({ email, username });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
  }

  async create(createUserDto: CreateUserDTO): Promise<User> {
    await this.validateUserExists(createUserDto.email, createUserDto.username);
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findUser(findUserDto: FindUserDTO): Promise<User> {
    const user = await this.findUserByCriteria(findUserDto);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.findUserByCriteria({ id });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
}
