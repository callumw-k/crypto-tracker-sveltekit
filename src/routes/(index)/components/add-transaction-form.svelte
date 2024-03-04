<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import type { TransactionForm } from '$lib/formSchema';
	import { Label } from '$lib/components/ui/label';
	import Input from '$lib/components/ui/input/input.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import SelectContent from '$lib/components/ui/select/select-content.svelte';
	import SelectTrigger from '$lib/components/ui/select/select-trigger.svelte';
	import { Select, SelectValue } from '$lib/components/ui/select';
	import SelectLabel from '$lib/components/ui/select/select-label.svelte';
	import SelectItem from '$lib/components/ui/select/select-item.svelte';

	let { formData, tokens } = $props<{
		formData: SuperValidated<Infer<TransactionForm>>;
		tokens: { id: string; name: string }[];
	}>();

	const { form, enhance } = superForm(formData);

</script>

{JSON.stringify(tokens)}
<form
	class="flex flex-col items-start gap-4 p-4"
	method="POST"
	action="?/addTransaction"
	use:enhance
>
	<Label for="tokenName">Token Name</Label>
	<Select>
		<SelectTrigger>
			<SelectValue placeholder="Select a token" />
		</SelectTrigger>
		<SelectContent>
			<SelectLabel>Tokens</SelectLabel>
			{#each tokens as token}
				<SelectItem value={token.id} label={token.name}>{token.name}</SelectItem>
			{/each}
		</SelectContent>
	</Select>

	<Label for="price">Price</Label>
	<Input type="number" id="price" name="price" bind:value={$form.price} />

	<Label for="quantity">Quantity</Label>
	<Input type="text" id="quantity" name="quantity" bind:value={$form.quantity} />
	<Button type="submit">Add</Button>
</form>
