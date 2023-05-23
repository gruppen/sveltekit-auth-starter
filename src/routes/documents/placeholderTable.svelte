<script>
	export let rowCount = 10;

	let rows = Array(rowCount);
</script>

<div class="table-container">
	<table class="table">
		<thead>
			<th>name</th>
			<th>docType</th>
			<th>displayName</th>
			<th>admin</th>
		</thead>
		<tbody>
			{#each rows as row}
				<tr>
					<td><div class="placeholder" /></td>
					<td><div class="placeholder" /></td>
					<td><div class="placeholder" /></td>
					<td><div class="placeholder" /></td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
