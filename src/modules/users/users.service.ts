import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../database/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findByEmail(email: string): Promise<User|null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async findOne(id: string): Promise<User|null> {
    return this.userRepository.findOne({ where: { id } });
  }

  async create(user: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async update(id: string, user: Partial<User>): Promise<User|null> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
  async updatePassword(email: string, newPassword: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    if (!user) return false;
    user.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(user);
    return true;
  }
}