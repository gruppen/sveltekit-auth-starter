<script lang="ts">
	import { ListBox, ListBoxItem, modalStore } from '@skeletonlabs/skeleton';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Local
	let flavor = 'chocolate';

	// Handle Form Submission
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(flavor);
		modalStore.close();
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
		<article>{$modalStore[0].body ?? '(body missing)'}</article>
		<ListBox class="border border-surface-500 p-4 rounded-container-token">
			<ListBoxItem bind:group={flavor} name="chocolate" value="chocolate">Chocolate</ListBoxItem>
			<ListBoxItem bind:group={flavor} name="vanilla" value="vanilla">Vanilla</ListBoxItem>
			<ListBoxItem bind:group={flavor} name="strawberry" value="strawberry">Strawberry</ListBoxItem>
			<ListBoxItem bind:group={flavor} name="peach" value="peach">Peach</ListBoxItem>
		</ListBox>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Select Flavors</button>
    </footer>
	</div>
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
