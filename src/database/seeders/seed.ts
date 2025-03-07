// import { NestFactory } from "@nestjs/core";
import dataSource from "../data-source";
import { User } from "../entities/user.entity";
// import { SeedService } from "./seed.service";

async function runSeeders() {
//   const app = await NestFactory.createApplicationContext(AppModule);
//   const seedService = app.get(SeedService);
//   await seedService.runSeeders();
//   await app.close();
await dataSource.initialize()
.then(() => console.log("✅ Database connected for seeding"))
.catch((error) => {
  console.error("❌ Database connection failed:", error);
  process.exit(1);
});

// Example: Insert dummy users
const userRepository = dataSource.getRepository(User);
await userRepository.insert([
{ first_name: "Alice", email: "alice@example.com" },
{ first_name: "Bob", email: "bob@example.com" },
]);

console.log("✅ Seeding completed!");

// Close the connection
await dataSource.destroy();
}

runSeeders()
  .then(() => console.log("✅ Seeding completed"))
  .catch((error) => console.error("❌ Seeding failed:", error));
