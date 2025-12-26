import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

// Clean up psql prefix and quotes if they exist
const cleanUrl = databaseUrl.startsWith("psql '") 
  ? databaseUrl.slice(6, -1) 
  : databaseUrl;

export const pool = new Pool({ connectionString: cleanUrl });
export const db = drizzle(pool, { schema });
