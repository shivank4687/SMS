import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { AppLogger } from './common/services/logger/logger.service';
import { UsersModule } from './modules/users/users.module';
import { typeOrmConfig } from './config/typeorm.config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Make the config available globally
      // envFilePath:['.env']
      // load
      // envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
    }),
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot(typeOrmConfig)
  ],
  controllers: [AppController],
  providers: [AppService,AppLogger],
})
export class AppModule {

  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes('*');
  // }
}
