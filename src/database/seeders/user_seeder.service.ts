import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserSeederService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async seed(): Promise<void> {
    const exists = await this.userRepository.count();
    if (exists > 0) {
      console.log("✅ Users already exist. Skipping seeding.");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);
    const users = [
      { name: "Admin", email: "admin@example.com", password: hashedPassword },
      { name: "User", email: "user@example.com", password: hashedPassword },
    ];

    await this.userRepository.save(users);
    console.log("✅ Users seeded successfully!");
  }
}
