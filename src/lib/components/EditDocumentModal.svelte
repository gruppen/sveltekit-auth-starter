<script lang="ts">
	import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	import type { SubmitFunction } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;

	const submit: SubmitFunction = async () => {
		// do something before the form is submitted

		return async ({ update }) => {
			// do something after the form is submitted

			await update();
		};
	};
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	export let docName = $modalStore[0].meta.doc.name ?? '';
	export let docType = $modalStore[0].meta.doc.docType ?? '';

	// Handle Form Submission
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(docName, docType);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<form action="?/" use:enhance={submit}>
		<div class="modal-example-form {cBase}">
			<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
			<article>{$modalStore[0].body ?? '(body missing)'}</article>

			<label class="label">
				<span>Name</span>
				<input
					class="input"
					title="name"
					type="text"
					placeholder="input text"
					name="name"
					bind:value={docName}
				/>
			</label>

			<label class="label" for="docType"
				><span>Document Type</span>
				<select name="docType" id="docType" class="select" bind:value={docType}>
					<option value="INVOICE">Invoice</option>
					<option value="CREDITNOTE">Credit Note</option>
					<option value="DEBITNOTE">Debit Note</option>
				</select>
			</label>

			<!-- prettier-ignore -->
			<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select Flavors</button>
			</footer>
		</div>
	</form>
{/if}

<style>
	.loader {
		position: relative;
		background: #ff3d00;
		width: 80px;
		height: 30px;
		line-height: 18px;
		text-align: center;
		color: #931010;
		font-weight: 700;
		letter-spacing: 0.5px;
		font-size: 14px;
		box-sizing: border-box;
		border: 5px groove #de3500;
		border-radius: 0 0 4px 4px;
		box-shadow: 0 5px 7px #0002;
	}
	.loader:before {
		content: '';
		width: 70px;
		height: 80px;
		background: #fff;
		box-shadow: 0 0 10px #0003;
		position: absolute;
		left: 50%;
		transform: translatex(-50%);
		bottom: calc(100% + 6px);
		animation: loadPaper 4s ease-in infinite;
	}
	.loader:after {
		content: '';
		width: 70px;
		height: 80px;
		background: linear-gradient(to right, #fff 50%, #0000 51%);
		background-size: 9px 80px;
		position: absolute;
		left: 50%;
		transform: translatex(-50%);
		top: calc(100% + 6px);
		animation: disposePaper 4s ease-in infinite;
	}

	@keyframes loadPaper {
		0%,
		10% {
			height: 80px;
			bottom: calc(100% + 40px);
		}
		50% {
			height: 80px;
			bottom: calc(100% + 6px);
		}
		75%,
		100% {
			height: 0px;
			bottom: calc(100% + 6px);
		}
	}

	@keyframes disposePaper {
		0%,
		50% {
			height: 0px;
			top: calc(100% + 6px);
		}
		75% {
			height: 80px;
			top: calc(100% + 6px);
			opacity: 1;
		}
		100% {
			height: 80px;
			top: calc(100% + 40px);
			opacity: 0;
		}
	}
</style>
