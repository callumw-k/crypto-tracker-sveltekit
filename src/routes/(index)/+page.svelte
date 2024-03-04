<script lang="ts">
	import AddTokenForm from './components/add-token-form.svelte';
	import AddTransactionForm from './components/add-transaction-form.svelte';

	function uniqueTokens(tokens: typeof data.tokens) {
		let uniqueTokens: { id: string; name: string }[] = [];

		for (const token of tokens) {
      if (!uniqueTokens.find((t) => t.id === token.id)) {
        uniqueTokens.push({id: token.id, name: token.name});
      }
		}

		return uniqueTokens;
	}

	let { data } = $props();
	let tokens = $derived(uniqueTokens(data.tokens));

</script>

<div class="p-4">
	{#each data.tokens as token}
		<div class="mt-4">
			<p>{token.name}</p>
			<p>Quantity: {token.quantity}</p>
			<p>Price: ${token.price}</p>
		</div>
	{/each}
</div>

<AddTokenForm formData={data.form} />
<AddTransactionForm formData={data.transactionForm} tokens={tokens} />
