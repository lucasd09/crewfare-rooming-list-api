import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	schema: "./src/database/schemas/*",
	out: "./drizzle",
	dbCredentials: { url: process.env.DATABASE_URL ?? "" },
});
