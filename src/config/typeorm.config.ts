import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Role } from 'src/database/entities/role.entity';
import { User } from '../database/entities/user.entity';
import { DATABASE_CONFIG as DB_CONFIG } from './database.config';




export const typeOrmConfig: TypeOrmModuleOptions = {
  ...DB_CONFIG,
  entities:[Role,User], // Add all entities here
  synchronize: false,//process.env.NODE_ENV !== 'production', // Auto-sync schema (disable in production)
  // migrations: [__dirname + '/../migrations/*.ts'], // Path to migrations
//   cli: {
//     migrationsDir: 'src/migrations', // Directory for migrations
//   },
   autoLoadEntities:true,
// migrationsRun: false, // Run migrations automatically
};