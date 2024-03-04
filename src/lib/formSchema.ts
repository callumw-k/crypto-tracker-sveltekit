import { z } from 'zod';

export const tokenFormSchema = z.object({
	name: z.string().min(1, 'Please enter a name')
});

export type TokenForm = typeof tokenFormSchema;

export const transactionFormSchema = z.object({
	price: z.string().min(1, 'Please enter a price'),
	quantity: z.string().min(1, 'Please enter a quantity'),
	tokenName: z.string().min(1, 'Please enter a token')
});

export type TransactionForm = typeof transactionFormSchema;
