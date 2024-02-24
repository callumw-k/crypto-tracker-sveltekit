<script lang="ts">
	import { superForm, type SuperValidated   } from 'sveltekit-superforms';
	import type { z } from 'zod';
  import { tokenFormSchema } from '$lib';

	let { formData } = $props<{ formData: SuperValidated<z.infer<typeof tokenFormSchema>> }>();
  const { form, enhance } = superForm(formData)
</script>

<form >
	<label for="name">Name</label>
	<input type="text" name="name" id="name" />
	<button type="submit">Add</button>
	{$form.name}
</form>
