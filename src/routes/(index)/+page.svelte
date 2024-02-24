<script lang="ts">
	import AddTokenForm from './components/add-token-form.svelte';

	let { data } = $props();
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

<div>
	<AddTokenForm formData={data.form} />
</div>
