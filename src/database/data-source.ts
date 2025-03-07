import { DataSource } from 'typeorm';
import { DATABASE_CONFIG } from '../config/database.config';
import { Client } from 'pg';


async function ensureDatabaseExists() {
    const { host, port, username, password, database } = DATABASE_CONFIG;
  
    // Connect to PostgreSQL without specifying a database
    const client = new Client({
      host: host as string,
      port: Number(port),
      user: username,
      password: password,
      database: 'postgres', // Connect to the default 'postgres' database
    });
  
    try {
      await client.connect();
      const result = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${database}'`);
  
      if (result.rowCount === 0) {
        console.log(`📌 Database "${database}" does not exist. Creating...`);
        await client.query(`CREATE DATABASE "${database}"`);
        console.log(`✅ Database "${database}" created successfully.`);
      } else {
        console.log(`✅ Database "${database}" already exists.`);
      }
    } catch (error) {
      console.error('❌ Error checking/creating database:', error);
    } finally {
      await client.end();
    }
  }

const dataSourceConfig={
    ...DATABASE_CONFIG,
    entities:['src/database/entities/*.entity.ts'],
    migrations: ['src/database/migrations/*.ts'],
    synchronize: false, // Migrations require synchronize to be false
    logging: true,
};
  // Initialize the database before TypeORM connects
//   await ensureDatabaseExists();
const dataSource = new DataSource(dataSourceConfig);
// dataSource.initialize()
//   .then(() => console.log("Database Connected"))
//   .catch((error) => console.error("Error connecting to database", error));
export default dataSource;
