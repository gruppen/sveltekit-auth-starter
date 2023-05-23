<script lang="ts">
	// Props
	import { superForm } from 'sveltekit-superforms/client';
	//import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte';
	import { userSchema } from '$lib/config/zod-schemas';

	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore, toastStore, type ToastSettings } from '@skeletonlabs/skeleton';

	const formMeta = $modalStore[0].meta?.user ?? {};

	// Form Data
	const formData = {
		id: formMeta.id ?? '',
		firstName: formMeta.firstName ?? '',
		lastName: formMeta.lastName ?? '',
		displayName: formMeta.displayName ?? ''
	};

	const { form, errors, enhance, delayed } = superForm(formData, {
		taintedMessage: null,
		delayMs: 400
	});

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) {
			$modalStore[0].response(formData);
			toastTheInfo(formData);
		}
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';

	function toastTheInfo(formData: any) {
		const t: ToastSettings = {
			message: `From the Modal: ${JSON.stringify(formData)}`
		};
		toastStore.trigger(t);
	}
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}" method="POST" action="" use:enhance>
			<label class="label">
				<span>First Name</span>
				<input
					class="input"
					type="text"
					bind:value={formData.firstName}
					placeholder="Enter first name..."
				/>
			</label>
			<label class="label">
				<span>Last name</span>
				<input
					class="input"
					type="text"
					bind:value={formData.lastName}
					placeholder="Enter last name..."
				/>
			</label>
			<label class="label">
				<span>Display name</span>
				<input
					class="input"
					type="text"
					bind:value={formData.displayName}
					placeholder="Enter display name..."
				/>
			</label>
			<input type="hidden" name="" />
		</form>

		<footer class="modal-footer {parent.regionFooter}">
			<button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
				{parent.buttonTextCancel}
			</button>
			<button class="btn {parent.buttonPositive}" on:click={onFormSubmit}> Submit Form </button>
			<button
				type="button"
				class="btn btn-sm variant-ringed-secondary"
				on:click={() => toastTheInfo(formData)}
			>
				Button
			</button>
		</footer>
	</div>
{/if}
