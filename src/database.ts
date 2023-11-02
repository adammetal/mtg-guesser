import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import * as schema from '@/schema';
 
const connectionString = process.env.DATABASE_URL ?? "";
const sql = postgres(connectionString, { max: 1 })

const migrateDb = drizzle(sql);
export const db = drizzle(sql, { schema }); 

await migrate(migrateDb, { migrationsFolder: "drizzle" });
