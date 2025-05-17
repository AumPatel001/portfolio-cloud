#!/usr/bin/env tsx

import { migrate } from "drizzle-orm/postgres-js/migrator";
import { db } from "../server/db";

// Run migrations
async function main() {
  console.log("Running database migrations...");
  
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations completed successfully");
  } catch (error) {
    console.error("Error running migrations:", error);
    process.exit(1);
  }
  
  process.exit(0);
}

main();