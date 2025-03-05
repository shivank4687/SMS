
import * as dotenv from 'dotenv';
dotenv.config();

type DatabaseConfig = {
    type: "postgres";
    host: string;
    port: number;
    username: string;
    password?: string;
    database: string;
  };
  

export const DATABASE_CONFIG=getDatabaseConfig();


function getDatabaseConfig():DatabaseConfig{
  
    return {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'nest_db'
    };
}