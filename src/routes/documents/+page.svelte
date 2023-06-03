<script lang="ts">
	import DeleteDocumentModal from './../../lib/components/deleteDocumentModal.svelte';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		Paginator,
		type TableSource,
		modalStore,
		type ModalSettings,
		type ModalComponent
	} from '@skeletonlabs/skeleton';
	export let data: PageData;

	import PlaceholderTable from './placeholderTable.svelte';
	import { goto } from '$app/navigation';

	import DeletingSpinner from '$lib/components/deletingSpinner.svelte';
	import EditDocumentModal from '$lib/components/EditDocumentModal.svelte';

	let { documents } = data;

	let loaded = false;

	onMount(() => {
		loaded = true;
	});

	// logic for making sure that the amounts dropdown has the correct values (i.e. not too high)

	$: paginatorSettings = {
		offset: 0,
		limit: 10,
		size: documents.length,
		amounts: [...new Set([1, 5, 10, 20, 30, 40, documents.length])]
	};

	$: paginatedSource = documents.slice(
		paginatorSettings.offset * paginatorSettings.limit, // start
		paginatorSettings.offset * paginatorSettings.limit + paginatorSettings.limit // end
	);

	function onPageChange(e: CustomEvent): void {
		console.log('event:page', e.detail);
	}

	function onAmountChange(e: CustomEvent): void {
		console.log('event:amount', e.detail);
	}

	function onRowClick(docId: string): void {
		// goto(`/documents/${docId}`);
	}

	// const modalSettings: ModalSettings = {
	// 	title: 'Edit Doc',
	// 	type: 'confirm',

	// 	response(r) {
	// 		console.log('response', r);
	// 	}
	// };

	let responseFromDeleteModal: any = null;

	function docModalOpen(doc: any): void {
		const c: ModalComponent = { ref: DeletingSpinner };

		modalStore.trigger({
			type: 'component',
			title: `Are you sure?`,
			body: `Are you sure you want to remove document ${doc.name}? This action cannot be undone.`,
			component: c,
			meta: { doc },

			response(r) {
				console.log('response', r);
			}
		});
	}
	function editDocModalOpen(doc: any): void {
		const c: ModalComponent = { ref: EditDocumentModal };

		modalStore.trigger({
			type: 'component',
			title: `Edit document ${doc.name}?`,
			body: ' Edit doc:',
			component: c,
			meta: { doc },

			response(r) {
				console.log('response', r);
			}
		});
	}
</script>

<div class="flex flex-col justify-center">
	<div class="card p-6 pb-8 pt-8">
		<div class="flex flex-row justify-start items-center mb-4">
			<h2>Documents</h2>
			<button class="btn btn-sm variant-filled-primary ml-4">New</button>
			<div class="ml-4 w-full">
				<pre>Response from DeleteDocumentModal: {$responseFromDeleteModal} </pre>
			</div>
		</div>

		<hr class="!border-t-2 mt-2 mb-6" />

		<!-- prettier-ignore -->
		<div class="table-container">
			<table class="table  table-interactive">
				<thead>
					<tr>
						<th >name</th>
						<th class="table-cell-fit">type</th>
						<th class="table-cell-fit">User</th>
						<th class="table-cell-fit">Role</th>
						<th class="table-cell-fit"></th>
					</tr>
				</thead>
				<tbody id="documents">
					{#each paginatedSource as doc}
						<tr on:click={() => onRowClick(doc.id) }>
							<td >{doc.name}</td>
							<td class="table-cell-fit">{doc.docType}</td>
							<td class="table-cell-fit">{doc.auth_user.displayName}</td>
							<td class="table-cell-fit">{doc.auth_user.role}</td>
							<td class="table-cell-fit ">
								<div class="flex gap-4">
									<button on:click={docModalOpen(doc)} class="btn btn-sm variant-filled-error">delete</button>
									<button on:click={editDocModalOpen(doc)} class="btn btn-sm variant-filled-tertiary">edit</button>
								</div>
						</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>

		<Paginator
			class="mt-4"
			bind:settings={paginatorSettings}
			on:page={onPageChange}
			on:amount={onAmountChange}
		/>
	</div>
</div>

<style>
	#documents td {
		vertical-align: middle;
	}
</style>
