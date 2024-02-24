import { z } from 'zod';

export const tokenFormSchema = z.object({
	name: z.string().min(1, 'Please enter a name')
});

export type TokenFormData = z.infer<typeof tokenFormSchema>;
