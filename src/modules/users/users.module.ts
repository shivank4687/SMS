import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
// import { UserRepository } from './user.repository';
// import { UserLoggerMiddleware } from './user.middleware';
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(UserLoggerMiddleware).forRoutes(UserController);
  // }
}
