<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
  import { type TokenForm } from '$lib/formSchema';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import { Button } from '$lib/components/ui/button';

	let { formData } = $props<{ formData: SuperValidated<Infer<TokenForm>> }>();
	const { form, enhance } = superForm(formData);
</script>

<form class="p-4 flex gap-4 flex-col items-start" method="POST"  action="?/addToken" use:enhance>
	<Label for="tokenName">Name</Label>
  <Input type="text" id="name" name="name" bind:value={$form.name} />
	<Button type="submit">Add</Button>
</form>
