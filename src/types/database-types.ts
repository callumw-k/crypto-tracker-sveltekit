import type { Generated } from 'kysely';

export interface Database {
	tokens: TokenTable;
	transactions: TransactionTable;
}

export interface TokenTable {
	id: Generated<string>;
	name: string;
}

export interface TransactionTable {
	id: Generated<number>;
	quantity: number;
	price: number;
	token_id: string;
	created_at: Generated<Date>;
}
