import { createPool } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const connection = async () => {
  const pool = await createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectionLimit: 10,
    // port: process.env.DB_PORT,
    waitForConnections: true,
    queueLimit: 0,
  });
  return pool;
};
