import { Kysely, PostgresDialect } from 'kysely';
import pkg from 'pg';
const { Pool } = pkg;
import type { Database } from '../types/database-types';

const dialect = new PostgresDialect({
	pool: new Pool({
		database: 'postgres',
		host: 'localhost',
		user: 'postgres',
		password: 'postgres',
		port: 5432,
		max: 10
	})
});

export const db = new Kysely<Database>({ dialect });
