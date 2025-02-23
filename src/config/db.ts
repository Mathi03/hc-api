import { Pool } from "pg";
import dotenv from "dotenv";
import { parse } from "pg-connection-string";

dotenv.config();

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error("DATABASE_URL is not defined in environment variables");
}

const config = parse(dbUrl);
console.log("ENV VARIABLES:", config);

const pool = new Pool({
  user: config.user,
  host: config.host ?? undefined,
  database: config.database ?? undefined,
  password: config.password,
  port: Number(config.port),
  ssl:
    process.env.NODE_ENV === "production"
      ? { rejectUnauthorized: false }
      : false,
});

export default pool;
