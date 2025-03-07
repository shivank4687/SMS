import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { UserSeederService } from "./user_seeder.service";
import { SeedService } from "./seed.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserSeederService, SeedService],
  exports: [SeedService],
})
export class SeedersModule {}
