<script>
	let users = $state([]); // Initialize users as an empty array
	import { onMount } from 'svelte';

	onMount(() => {
		try {
			fetch('/database/fetching/allUsers', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then((data) => {
					users = data; // Update the users state with the fetched data
				})
				.catch((error) => console.log('Error ', error));
		} catch (error) {
			console.log('Error fetching data');
		}
	});

	// Function to filter out the 'ID' key from an object
	function excludeIdField(obj) {
		const { id, ...rest } = obj; // Destructure to remove the 'ID' field
		return rest;
	}
</script>

<main>
	<h1 class="text-center">Members Data</h1>
	{#if users.length > 0}
		<table>
			<thead>
				<tr>
					{#each Object.keys(excludeIdField(users[0])) as key}
						<th>{key}</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each users as user}
					<tr>
						{#each Object.values(excludeIdField(user)) as value}
							<td>{value}</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Loading users...</p>
	{/if}
</main>

<style>
	main {
		font-family: Arial, sans-serif;
		padding: 20px;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		border-radius: 8px;
		overflow: hidden;
	}

	th,
	td {
		padding: 12px 15px;
		text-align: left;
	}

	th {
		background-color: #00b492;
		color: white;
		font-weight: bold;
	}

	tr:nth-child(even) {
		background-color: #f3f3f3;
	}

	tr:hover {
		background-color: #24a8b9;
	}

	td {
		border-bottom: 1px solid #ddd;
	}

	p {
		text-align: center;
		color: #00b492;
		font-size: 18px;
	}
</style>
