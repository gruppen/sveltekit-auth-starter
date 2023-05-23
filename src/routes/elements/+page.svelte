<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import {
		toastStore,
		type ToastSettings,
		Table,
		Paginator,
		type TableSource
	} from '@skeletonlabs/skeleton';
	import { tableMapperValues } from '@skeletonlabs/skeleton';
	export let data: PageData;

	// let tableBody = data.documents.map((doc) => [doc.name, doc.docType, doc.auth_user.displayName]);
	let tableBody = data.documents;
	tableBody = tableBody;

	const sourceData = [
		{ position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
		{ position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
		{ position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
		{ position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
		{ position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
		{ position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
		{ position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
		{ position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
		{ position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
		{ position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' }
	];

	const tableSimple: TableSource = {
		// A list of heading labels.
		head: ['Name', 'Symbol', 'Weight'],
		// The data visibly shown in your table body UI.
		body: tableMapperValues(sourceData, ['name', 'symbol', 'weight']),
		// Optional: The data returned when interactive is enabled and a row is clicked.
		meta: tableMapperValues(sourceData, ['position', 'name', 'symbol', 'weight']),
		// Optional: A list of footer labels.
		foot: ['Total', '', '<code class="code">5</code>']
	};

	let pageSimple = {
		offset: 0,
		limit: 5,
		size: sourceData.length,
		amounts: [1, 2, 5, 10]
	};

	$: paginatedSource = sourceData.slice(
		pageSimple.offset * pageSimple.limit, // start
		pageSimple.offset * pageSimple.limit + pageSimple.limit // end
	);

	let tableHeaders: string[] = ['Positions', 'Name', 'Weight', 'Symbol'];
</script>

<pre style="font-size: 0.7rem; line-height: 0.7rem;">{JSON.stringify(
		paginatedSource,
		null,
		2
	)}</pre>

<Paginator bind:settings={pageSimple} />
