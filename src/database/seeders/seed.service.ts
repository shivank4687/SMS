import { Injectable } from "@nestjs/common";
import { UserSeederService } from "./user_seeder.service";
import { RoleSeederService } from "./role_seeder.service"; // Example

@Injectable()
export class SeedService {
  constructor(
    private readonly userSeeder: UserSeederService,
    private readonly roleSeeder: RoleSeederService
  ) {}

  async runSeeders(): Promise<void> {
    console.log("🚀 Running seeders...");
    await this.roleSeeder.seed(); // Run roles first
    await this.userSeeder.seed(); // Run users after roles
    console.log("✅ Seeding completed!");
  }
}
