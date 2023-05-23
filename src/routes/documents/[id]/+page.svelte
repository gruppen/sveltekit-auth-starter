<script lang="ts">
	import { page } from '$app/stores';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex flex-col justify-center">
	<div class="card p-6 pb-8 pt-8">
		<div class="flex flex-row justify-start items-center mb-4">
			<h2>{data.document?.name}</h2>
		</div>

		<hr class="!border-t-2 mt-2 mb-6" />

		<span class="my-48 loader" />
	</div>
</div>

<style>
	.loader {
		display: block;
		position: relative;
		height: 12px;
		width: 100%;
		border: 1px solid rgb(var(--color-surface-600));
		border-radius: 10px;
		overflow: hidden;
	}
	.loader::after {
		content: '';
		width: 40%;
		height: 100%;
		background: rgba(var(--color-primary-500));
		position: absolute;
		top: 0;
		left: 0;
		box-sizing: border-box;
		animation: animloader 2s linear infinite;
	}

	@keyframes animloader {
		0% {
			left: 0;
			transform: translateX(-100%);
		}
		100% {
			left: 100%;
			transform: translateX(0%);
		}
	}
</style>
