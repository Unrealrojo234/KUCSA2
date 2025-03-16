<script>
	let users = $state([]); // Initialize users as an empty array
	import { onMount } from 'svelte';

	let totalMembers = $state(null);
	let registeredMembers = $state(null);

	let renewedMembers = $state(null);
	let unregisteredMembers = $state(null);
	let unRenewedMembers = $state(null);

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
					users = data;
					totalMembers = users.length;
					registeredMembers = users.filter((user) => user.registered === true).length;
					renewedMembers = users.filter((user) => user.renewed === true).length;
					unregisteredMembers = users.filter((user) => user.registered === false).length;
					unRenewedMembers = users.filter((user) => user.renewed === false).length;
				})
				.catch((error) => console.log('Error ', error));
		} catch (error) {
			console.log('Error fetching data');
		}
	});
	// Add percentage calculationsb
	let registeredPercentage = $derived(
		totalMembers ? Math.round((registeredMembers / totalMembers) * 100) : 0
	);
	let renewedPercentage = $derived(
		totalMembers ? Math.round((renewedMembers / totalMembers) * 100) : 0
	);
</script>

<main class="container-fluid px-4 py-5">
	<h1 class="text-center mb-5 display-4 fw-bold">KUCSA Statistics</h1>

	<!-- Summary Cards -->
	<div class="row g-4 mb-5">
		<!-- Total Members -->
		<div class="col-md-6 col-xl-3">
			<div class="card bg-dark white-shadow border-0 h-100">
				<div class="card-body text-center">
					<div class="d-flex align-items-center justify-content-center gap-3">
						<div class="icon-square bg-primary text-white rounded-circle p-3">
							<i class="bi bi-people-fill fs-4"></i>
						</div>
						<div>
							<h3 class="mb-0 fw-bold">{totalMembers}</h3>
							<span class="text-muted">Total Members</span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Registered Members -->
		<div class="col-md-6 col-xl-3">
			<div class="card bg-dark white-shadow border-0 h-100">
				<div class="card-body">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<span class="text-muted">Registered</span>
						<span class="badge bg-success">{registeredPercentage}%</span>
					</div>
					<div class="progress" style="height: 8px;">
						<div
							class="progress-bar bg-gradient-success"
							role="progressbar"
							style={`width: ${registeredPercentage}%`}
							aria-valuenow={registeredPercentage}
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
					<div class="mt-2 text-end">
						<span class="h5 fw-bold">{registeredMembers}</span>
						<span class="text-muted">/{totalMembers}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Renewed Members -->
		<div class="col-md-6 col-xl-3">
			<div class="card bg-dark white-shadow border-0 h-100">
				<div class="card-body">
					<div class="d-flex justify-content-between align-items-center mb-3">
						<span class="text-muted">Renewed</span>
						<span class="badge bg-info">{renewedPercentage}%</span>
					</div>
					<div class="progress" style="height: 8px;">
						<div
							class="progress-bar bg-gradient-info"
							role="progressbar"
							style={`width: ${renewedPercentage}%`}
							aria-valuenow={renewedPercentage}
							aria-valuemin="0"
							aria-valuemax="100"
						></div>
					</div>
					<div class="mt-2 text-end">
						<span class="h5 fw-bold">{renewedMembers}</span>
						<span class="text-muted">/{totalMembers}</span>
					</div>
				</div>
			</div>
		</div>

		<!-- Status Distribution Chart -->
		<div class="col-md-6 col-xl-3">
			<div class="card bg-dark white-shadow border-0 h-100">
				<div class="card-body">
					<h6 class="card-title text-muted mb-4">Membership Status</h6>
					<div class="chart-container position-relative">
						<svg width="100%" height="120" viewBox="0 0 120 120">
							<!-- Background Circle -->
							<circle cx="60" cy="60" r="50" fill="none" stroke="#eee" stroke-width="10" />

							<!-- Active Members -->
							<circle
								cx="60"
								cy="60"
								r="50"
								fill="none"
								stroke="#4caf50"
								stroke-width="10"
								stroke-dasharray={`${registeredPercentage} ${100 - registeredPercentage}`}
								stroke-dashoffset="25"
								transform="rotate(-90 60 60)"
							/>

							<!-- Renewed Members -->
							<circle
								cx="60"
								cy="60"
								r="35"
								fill="none"
								stroke="#2196f3"
								stroke-width="10"
								stroke-dasharray={`${renewedPercentage} ${100 - renewedPercentage}`}
								stroke-dashoffset="25"
								transform="rotate(-90 60 60)"
							/>
						</svg>
						<div class="position-absolute top-50 start-50 translate-middle text-center">
							<div class="h4 mb-0 fw-bold">{totalMembers}</div>
							<small class="text-muted">Total</small>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<!-- Detailed Stats Section -->
	<div class="row g-4">
		<!-- Registration Status -->
		<div class="col-lg-6">
			<div class="card bg-dark white-shadow border-0 h-100">
				<div class="card-body">
					<h5 class="card-title mb-4">
						<i class="bi bi-person-check me-2"></i>
						Registration Status
					</h5>
					<div class="row">
						<div class="col-6">
							<div class="d-flex align-items-center gap-3 mb-3">
								<div class="bg-success p-2 rounded">
									<i class="bi bi-check2-circle text-white"></i>
								</div>
								<div>
									<div class="h5 mb-0">{registeredMembers}</div>
									<small class="text-muted">Registered</small>
								</div>
							</div>
						</div>
						<div class="col-6">
							<div class="d-flex align-items-center gap-3 mb-3">
								<div class="bg-danger p-2 rounded">
									<i class="bi bi-x-circle text-white"></i>
								</div>
								<div>
									<div class="h5 mb-0">{unregisteredMembers}</div>
									<small class="text-muted">Unregistered</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Renewal Status -->
		<div class="col-lg-6">
			<div class="card bg-dark white-shadow border-0 h-100">
				<div class="card-body">
					<h5 class="card-title mb-4">
						<i class="bi bi-arrow-repeat me-2"></i>
						Renewal Status
					</h5>
					<div class="row">
						<div class="col-6">
							<div class="d-flex align-items-center gap-3 mb-3">
								<div class="bg-info p-2 rounded">
									<i class="bi bi-check2-circle text-white"></i>
								</div>
								<div>
									<div class="h5 mb-0">{renewedMembers}</div>
									<small class="text-muted">Renewed</small>
								</div>
							</div>
						</div>
						<div class="col-6">
							<div class="d-flex align-items-center gap-3 mb-3">
								<div class="bg-warning p-2 rounded">
									<i class="bi bi-exclamation-triangle text-white"></i>
								</div>
								<div>
									<div class="h5 mb-0">{unRenewedMembers}</div>
									<small class="text-muted">Pending Renewal</small>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.white-shadow {
		box-shadow: 0 0 10px rgba(255, 255, 255, 0.8) !important;
	}
	.card {
		border-radius: 1rem;
		transition: transform 0.2s;
	}

	.card:hover {
		transform: translateY(-5px);
	}

	.progress-bar {
		transition: width 1s ease-in-out;
	}

	.icon-square {
		width: 50px;
		height: 50px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.bg-gradient-success {
		background: linear-gradient(45deg, #4caf50, #66bb6a);
	}

	.bg-gradient-info {
		background: linear-gradient(45deg, #2196f3, #42a5f5);
	}
</style>
