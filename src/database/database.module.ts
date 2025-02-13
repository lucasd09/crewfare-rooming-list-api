import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DATABASE_CONNECTION } from "./database-connection";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schemas from "./schemas";

@Module({
	providers: [
		{
			provide: DATABASE_CONNECTION,
			useFactory: (config: ConfigService) => {
				const pool = new Pool({
					connectionString: config.getOrThrow("DATABASE_URL"),
				});

				return drizzle(pool, { schema: schemas });
			},
			inject: [ConfigService],
		},
	],
})
export class DatabaseModule {}
