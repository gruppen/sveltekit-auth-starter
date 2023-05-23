<script lang="ts">
	import Logo from '$lib/components/logo.svelte';
	import { type ModalSettings, type ModalComponent, modalStore } from '@skeletonlabs/skeleton';

	import modalUserForm from '$lib/components/modalUserForm.svelte';

	type User = {
		id: string;
		firstName: string;
		lastName: string;
		displayName: string;
		email: string;
		role: string;
		verified: boolean;
		receiveEmail: boolean;
		createdAt: Date;
		updatedAt: Date;
	};

	function modalComponentForm(user: User): void {
		const editUserModal: ModalComponent = { ref: modalUserForm };
		const modal: ModalSettings = {
			type: 'component',
			component: editUserModal,
			title: 'Edit User',
			body: 'Update the user information and then press submit.',
			meta: { user },
			response: (r: any) => console.log('response:', r)
		};
		modalStore.trigger(modal);
	}

	export let data;
</script>

<div class="flex flex-col justify-center max-w-7xl">
	<div class="card p-6 pb-8 pt-8">
		<div>
			<div class="flex flex-row justify-start items-center mb-4">
				<h2>Protected Area</h2>
			</div>

			<hr class="!border-t-2 mt-2 mb-6" />

			<!-- 
	user: 
			id: true,
			firstName: true,
			lastName: true,
			displayName: true,
			email: true,
			role: true,
			verified: true,
			receiveEmail: true,
			createdAt: true,
			updatedAt: true
		 -->
			<div class="table-container">
				<!-- Native Table Element -->
				<table class="table table-hover">
					<thead>
						<tr>
							<th>id</th>
							<th>firstName</th>
							<th>lastName</th>
							<th>displayName</th>
							<th>email</th>
							<th>role</th>
							<th>verified</th>
							<th>receiveEmail</th>
							<th />
						</tr>
					</thead>
					<tbody>
						{#each data.allUsers as user}
							<tr>
								<td>{user.id}</td>
								<td>{user.firstName}</td>
								<td>{user.lastName}</td>
								<td>{user.displayName}</td>
								<td>{user.email}</td>
								<td>{user.role}</td>
								<td>{user.verified}</td>
								<td>{user.receiveEmail}</td>
								<td>
									<button class="btn variant-filled" on:click={() => modalComponentForm(user)}
										>Update</button
									>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->
		</div>
	</div>
</div>
