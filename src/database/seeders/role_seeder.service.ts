import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Role } from "../entities/role.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class RoleSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>
  ) {}

  async seed(): Promise<void> {
    const exists = await this.roleRepository.count();
    if (exists > 0) {
      console.log("✅ Roles already exist. Skipping seeding.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const roles = [
      { name: "Admin", email: "admin@example.com", password: hashedPassword },
      { name: "User", email: "user@example.com", password: hashedPassword },
    ];

    await this.roleRepository.save(roles);
    console.log("✅ Roles seeded successfully!");
  }
}
