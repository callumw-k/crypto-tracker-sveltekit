import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db } from '$lib';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { tokenFormSchema, transactionFormSchema } from '$lib/formSchema';

export const load: PageServerLoad = async ({ params }) => {
	const form = await superValidate(zod(tokenFormSchema));
	const transactionForm = await superValidate(zod(transactionFormSchema));
	const tokens = await db
		.selectFrom('tokens')
		.innerJoin('transactions', 'transactions.token_id', 'tokens.id')
		.select(['tokens.name', 'transactions.price', 'transactions.quantity', 'tokens.id'])
		.execute();
	return {
		form,
		params,
		tokens,
		transactionForm
	};
};

export const actions = {
	addToken: async ({ request }) => {
		const form = await superValidate(request, zod(tokenFormSchema));
		if (!form.valid) return fail(400, { form });
		try {
			await db.insertInto('tokens').values({ name: form.data.name }).execute();
		} catch (e) {
			return fail(400, { form });
		}
		return { form };
	},
	addTransaction: async ({ request }) => {
		const form = await superValidate(request, zod(transactionFormSchema));
		if (!form.valid) return fail(400, { form });
		try {
			const token = await db
				.selectFrom('tokens')
				.select(['id'])
				.where('tokens.name', '=', form.data.tokenName.toUpperCase())
				.executeTakeFirst();
			if (!token) return fail(400, { form });
			await db
				.insertInto('transactions')
				.values({
					token_id: token.id,
					price: parseFloat(form.data.price),
					quantity: parseFloat(form.data.quantity)
				})
				.execute();
		} catch (e) {
			return fail(400, { form });
		}
		return { form };
	}
} satisfies Actions;
