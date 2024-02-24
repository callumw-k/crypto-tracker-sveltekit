import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { db, tokenFormSchema } from '$lib';
import type { Actions, PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	const form = await superValidate(zod(tokenFormSchema));
	const tokens = await db
		.selectFrom('tokens')
		.innerJoin('transactions', 'transactions.token_id', 'tokens.id')
		.select(['tokens.name', 'transactions.price', 'transactions.quantity'])
		.execute();
	return {
		form,
		params,
		tokens
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(tokenFormSchema));
		if (!form.valid) return fail(400, { form });
		await db.insertInto('tokens').values({ name: form.data.name }).execute();
		return form;
	}
} satisfies Actions;
