<script>
	import Swal from 'sweetalert2';
	import { supabase } from '$lib/supabaseClient';

	let register = $state(true);
	let register2 = $state(true);

	let regNo = $state(null);
	let regNo2 = $state(null);

	const alerts = (icon, title) => {
		Swal.fire({
			icon: icon,
			title: title,
			showConfirmButton: false,
			timer: 2000,
			background: '#1e1e2f',
			color: '#ffffff',
			iconColor: icon === 'success' ? '#4caf50' : '#f44336'
		});
	};

	async function registrationRenewal(reg, type) {
		try {
			const updates = {};
			updates[type] = true;

			const { data, error: updateError } = await supabase
				.from('profiles')
				.update(updates)
				.eq('reg_number', reg)
				.select('*');

			if (updateError) throw updateError;

			alerts('success', 'Record Updated Successfully!');
			return data;
		} catch (error) {
			console.error('Error:', error.message);
			alerts('error', error.message);
		}
	}

	async function revokeRegistrationRenewal(reg, type) {
		try {
			const updates = {};
			updates[type] = false;

			const { data, error: updateError } = await supabase
				.from('profiles')
				.update(updates)
				.eq('reg_number', reg)
				.select('*');

			if (updateError) throw updateError;

			alerts('success', 'Record Updated Successfully!');
			return data;
		} catch (error) {
			console.error('Error:', error.message);
			alerts('error', error.message);
		}
	}
</script>

<main class="container-fluid py-4">
	<h2 class="text-center mb-4">Manage Registration/Renewal</h2>
	<div class="row justify-content-center">
		<!-- Left Column (Register/Renew) -->
		<div class="col-md-5 col-sm-12 mb-4">
			{#if register}
				<!-- Register Form -->
				<form
					onsubmit={async () => {
						regNo = regNo.toUpperCase();
						await registrationRenewal(regNo, 'registered');
					}}
					class="form form-control"
				>
					<p class="title">Register</p>
					<label>
						<input class="input" bind:value={regNo} type="text" required />
						<span>Reg No.</span>
					</label>
					<br />
					<button class="submit btn btn-success">Register</button>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" onclick={() => (register = !register)}
						>{register ? 'Switch to Renew' : 'Switch to Register'}</a
					>
				</form>
			{:else}
				<!-- Renew Form -->
				<form
					onsubmit={async () => {
						regNo = regNo.toUpperCase();
						await registrationRenewal(regNo, 'renewed');
					}}
					class="form form-control"
				>
					<p class="title">Renew</p>
					<label>
						<input class="input" bind:value={regNo} type="text" required />
						<span>Reg No.</span>
					</label>
					<br />
					<button class="submit btn btn-success">Renew</button>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" onclick={() => (register = !register)}
						>{register ? 'Switch to Renew' : 'Switch to Register'}</a
					>
				</form>
			{/if}
		</div>

		<!-- Right Column (Revoke Actions) -->
		<div class="col-md-5 col-sm-12 mb-4">
			{#if register2}
				<!-- Revoke Register -->
				<form
					onsubmit={async () => {
						regNo2 = regNo2.toUpperCase();
						await revokeRegistrationRenewal(regNo2, 'registered');
					}}
					class="form form-control"
				>
					<p class="title">Revoke Register</p>
					<label>
						<input class="input" bind:value={regNo2} type="text" required />
						<span>Reg No.</span>
					</label>
					<br />
					<button class="submit btn btn-danger">Revoke Register</button>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" onclick={() => (register2 = !register2)}
						>{register2 ? 'Switch to Revoke Renew' : 'Switch to Revoke Register'}</a
					>
				</form>
			{:else}
				<!-- Revoke Renew -->
				<form
					onsubmit={async () => {
						regNo2 = regNo2.toUpperCase();
						await revokeRegistrationRenewal(regNo2, 'renewed');
					}}
					class="form form-control"
				>
					<p class="title">Revoke Renew</p>
					<label>
						<input class="input" bind:value={regNo2} type="text" required />
						<span>Reg No.</span>
					</label>
					<br />
					<button class="submit btn btn-danger">Revoke Renew</button>
					<!-- svelte-ignore a11y_invalid_attribute -->
					<a href="#" onclick={() => (register2 = !register2)}
						>{register2 ? 'Switch to Revoke Renew' : 'Switch to Revoke Register'}</a
					>
				</form>
			{/if}
		</div>
	</div>
</main>

<style>
	/* From Uiverse.io by ammarsaa */
	.form {
		display: flex;
		flex-direction: column;
		gap: 10px;
		max-width: 32rem;
		padding: 1.5rem;
		border-radius: 20px;
		position: relative;
		background-color: #1a1a1a;
		color: #fff;
		border: 1px solid #333;
		margin: 0 auto;
	}

	a {
		color: #00b492;
		text-decoration-color: #0cffd2;
	}

	a:hover {
		color: #0cffd2;
	}

	.title {
		font-size: 28px;
		font-weight: 600;
		letter-spacing: -1px;
		position: relative;
		display: flex;
		align-items: center;
		padding-left: 30px;
		color: #00b492;
	}

	.title::before {
		width: 18px;
		height: 18px;
	}

	.title::after {
		width: 18px;
		height: 18px;
		animation: pulse 1s linear infinite;
	}

	.title::before,
	.title::after {
		position: absolute;
		content: '';
		height: 16px;
		width: 16px;
		border-radius: 50%;
		left: 0px;
		background-color: #00b492;
	}

	.form label {
		position: relative;
	}

	.form label .input {
		background-color: #333;
		color: #fff;
		width: 100%;
		padding: 20px 5px 5px 10px;
		outline: 0;
		border: 1px solid rgba(105, 105, 105, 0.397);
		border-radius: 10px;
	}

	.form label .input + span {
		color: rgba(255, 255, 255, 0.5);
		position: absolute;
		left: 10px;
		top: 0px;
		font-size: 0.9em;
		cursor: text;
		transition: 0.3s ease;
	}

	.form label .input:placeholder-shown + span {
		top: 12.5px;
		font-size: 0.9em;
	}

	.form label .input:focus + span,
	.form label .input:valid + span {
		color: #00b492;
		top: 0px;
		font-size: 0.7em;
		font-weight: 600;
	}

	.input {
		font-size: medium;
	}

	@keyframes pulse {
		from {
			transform: scale(0.9);
			opacity: 1;
		}

		to {
			transform: scale(1.8);
			opacity: 0;
		}
	}
</style>
