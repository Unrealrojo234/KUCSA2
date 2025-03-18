<script>
	import { onMount } from 'svelte';
	import QRCode from 'qrcode';
	import Swal from 'sweetalert2';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';
	import getUid from '$lib/UID';
	import OffCanvas from '../OffCanvas.svelte';

	let meetings = $state(null);

	let attendance = $state(null);

	let attendancePercentage = $state(0);
	let canvas;

	let uid = $state('');

	onMount(async () => {
		//Getting the current session
		uid = await getUid();

		// Create a canvas element and append it to the DOM
		canvas = document.createElement('canvas');

		document.body.appendChild(canvas);
		// Generate the QR code on the canvas
		await QRCode.toCanvas(canvas, `${uid}`, {
			width: 200,
			margin: 2
		});
	});

	onMount(() => {
		// Subscribe to realtime changes for the checker table
		const subscription = supabase
			.channel('public:checker') // Channel name
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'checker' },
				(payload) => {
					// Handle update
					meetings = payload.new.meetings;
				}
			)
			.subscribe();

		// Subscribe to realtime changes for the checker table
		const subscription2 = supabase
			.channel('public:attendance') // Channel name
			.on(
				'postgres_changes',
				{ event: 'INSERT', schema: 'public', table: 'attendance' },
				(payload) => {
					if (payload.new.uid == uid) {
						async function fetchData() {
							uid = await getUid();
							// Fetch initial attended meetings
							const { data, error } = await supabase.from('attendance').select('*').eq('uid', uid);

							if (error) console.error('Error fetching blogs:', error);
							else {
								attendance = await data.length;
								Swal.fire({
									icon: 'success',
									title: 'Attendance has been recorded!',
									showConfirmButton: false,
									timer: 1500,
									background: '#1e1e2f',
									color: '#ffffff',
									iconColor: '#4caf50'
								});
							}
						}

						fetchData();
					}
				}
			)
			.on(
				'postgres_changes',
				{ event: 'DELETE', schema: 'public', table: 'attendance' },
				(payload) => {
					if (payload.new.uid == uid) {
						async function fetchData() {
							uid = await getUid();
							// Fetch initial attended meetings
							const { data, error } = await supabase.from('attendance').select('*').eq('uid', uid);

							if (error) console.error('Error fetching blogs:', error);
							else {
								attendance = await data.length;
								Swal.fire({
									icon: 'success',
									title: 'Attendance has been updated',
									showConfirmButton: false,
									timer: 1500,
									background: '#1e1e2f',
									color: '#ffffff',
									iconColor: '#4caf50'
								});
							}
						}

						fetchData();

						console.log(payload);
					}
				}
			)
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'attendance' },
				(payload) => {
					if (payload.new.uid == uid) {
						async function fetchData() {
							uid = await getUid();
							// Fetch initial attended meetings
							const { data, error } = await supabase.from('attendance').select('*').eq('uid', uid);

							if (error) console.error('Error fetching blogs:', error);
							else {
								attendance = await data.length;
								Swal.fire({
									icon: 'success',
									title: 'Attendance has been recorded!',
									showConfirmButton: false,
									timer: 1500,
									background: '#1e1e2f',
									color: '#ffffff',
									iconColor: '#4caf50'
								});
							}
						}

						fetchData();

						console.log(payload);
					}
				}
			)
			.subscribe();

		// Cleanup subscription on components unmount
		return () => {
			supabase.removeChannel(subscription);
			supabase.removeChannel(subscription2);
		};
	});

	$effect(async () => {
		// Fetch initial  meetngs count
		const { data, error } = await supabase
			.from('checker')
			.select('*')
			.eq('id', 1)
			.order('created_at', { ascending: false });

		if (error) console.error('Error fetching blogs:', error);
		else {
			meetings = data[0].meetings;
		}
	});

	$effect(async () => {
		uid = await getUid();
		// Fetch initial attended meetings
		const { data, error } = await supabase.from('attendance').select('*').eq('uid', uid);

		if (error) console.error('Error fetching blogs:', error);
		else {
			console.log(data);
			attendance = data.length;
		}
	});

	const QRCodeGenerator = async () => {
		try {
			// Ensure the canvas is fully rendered
			await new Promise((resolve) => setTimeout(resolve, 100)); // Small delay

			// Convert the canvas to a data URL
			const qrCodeDataUrl = canvas.toDataURL('image/png');
			console.log('QR Code Data URL:', qrCodeDataUrl); // Debugging

			// Display the QR code in a SweetAlert2 modal
			Swal.fire({
				title: '<strong>Custom QR Code 🚀</strong>',
				html: `
					<img src="${qrCodeDataUrl}" class="image-fluid" alt="QR Code" style="width: 200px; height: 200px;"/>
				`,
				showCloseButton: false,
				showCancelButton: false,
				focusConfirm: false,
				showConfirmButton: false
			});
		} catch (error) {
			console.error('Error generating QR code:', error);
			Swal.fire({
				title: 'Error',
				text: 'Failed to generate QR code.',
				icon: 'error'
			});
		}
	};

	//Accessing data from the load function

	let { data } = $props();

	data = data.data;

	console.log(data);

	try {
		const { reg_number, first_name, last_name, phone_number, registered, renewed } = data;
	} catch (error) {
		console.log(error);
	}

	setInterval(() => {
		if (attendance > 0 && meetings > 0 && attendance <= meetings) {
			attendancePercentage = (attendance / meetings) * 100;
			attendancePercentage = attendancePercentage.toFixed(2);
		} else {
			attendancePercentage = 0;
		}
	}, 1000);

	let user = $state({
		name: first_name + ' ' + last_name,
		phone: phone_number,
		regNo: reg_number,
		isRegistered: registered,
		isRenewed: renewed,
		profile: 'avator.svg'
	});
</script>

<OffCanvas />

<main style="overflow-x: hidden;" class="container-fluid p-3 p-md-2">
	<h1 class="text-center mb-4 mb-md-5">Profile</h1>

	<!-- Profile Card -->
	<div class="card event-card shadow-lg mx-auto mb-5" style="max-width: 40rem;">
		<div class="card-body text-center p-4">
			<div class="profile-img-container">
				<!-- svelte-ignore a11y_img_redundant_alt -->
				<img src={user.profile} alt="Profile Picture" class="profile-img" />
			</div>
			<div class="card user-info mt-4 p-3">
				<h2 class="mb-3">{user.name}</h2>
				<p class="mb-2"><strong>Reg No:</strong> {user.regNo}</p>
				<p class="mb-2"><strong>Phone:</strong> {user.phone}</p>
			</div>
		</div>
	</div>

	<!-- Attendance Section -->
	<div class="text-center mb-5">
		<h2 class="mb-3">Attendance: {attendancePercentage}%</h2>
		<div class="attendance-bar mx-auto">
			<div class="attendance-progress" style={`width: ${attendancePercentage}%`}></div>
		</div>
	</div>

	<!-- Action Cards -->
	<div class="row justify-content-center g-4">
		<div class="col-12 col-md-6 col-lg-4">
			<div class="card event-card shadow-lg h-100">
				<div class="card-body text-center p-4">
					<h3 class="card-title mb-3">Registration</h3>
					<button
						type="button"
						disabled={registered}
						onclick={() => {
							goto('/payment/registration');
						}}
						class="btn cta-button">{registered ? 'Already Registered 🤝🏼' : 'Register 🥺'}</button
					>
				</div>
			</div>
		</div>
		<div class="col-12 col-md-6 col-lg-4">
			<div class="card event-card shadow-lg h-100">
				<div class="card-body text-center p-4">
					<h3 class="card-title mb-3">Renewal</h3>
					<button
						type="button"
						disabled={renewed || !registered}
						onclick={() => {
							goto('/payment/renewal');
						}}
						class="btn cta-button">{renewed ? 'Already Renewed 🤝🏼' : 'Renew 🥺'}</button
					>
				</div>
			</div>
		</div>
		<div class="col-12 col-md-6 col-lg-4">
			<div class="card event-card shadow-lg h-100">
				<div class="card-body text-center p-4">
					<h3 class="card-title mb-3">QR-Code</h3>
					<button type="button" onclick={QRCodeGenerator} class="btn cta-button">Generate ⚙️</button
					>
				</div>
			</div>
		</div>
	</div>
</main>

<style>
	.profile-img-container {
		display: flex;
		justify-content: center;
		margin-top: -4rem;
	}

	.profile-img {
		width: 8rem;
		height: 8rem;
		border-radius: 50%;
		border: 4px solid white;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
	}

	.user-info {
		background-color: #f8f9fa;
		padding: 1.5rem;
		border-radius: 0.5rem;
		margin-top: 1rem;
	}

	.attendance-bar {
		width: 70%;
		height: 10px;
		background-color: #e9ecef;
		border-radius: 5px;
		overflow: hidden;
		margin-top: 1rem;
	}

	.attendance-progress {
		height: 100%;
		background-color: #28a745;
		border-radius: 5px;
		transition: width 0.5s ease;
	}

	.card {
		border: none;
		background-color: #00b492;
		border-radius: 0.5rem;
	}

	.card-body {
		padding: 2rem;
	}

	.shadow-lg {
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
	}

	/* Responsive Adjustments */
	@media (max-width: 768px) {
		.profile-img {
			width: 6rem;
			height: 6rem;
		}

		.user-info {
			padding: 1rem;
		}

		.attendance-bar {
			width: 90%;
		}

		.card-body {
			padding: 1.5rem;
		}
	}

	@media (max-width: 576px) {
		h1 {
			font-size: 1.75rem;
		}

		h2 {
			font-size: 1.5rem;
		}

		h3 {
			font-size: 1.25rem;
		}

		.profile-img {
			width: 5rem;
			height: 5rem;
		}

		.user-info {
			padding: 0.75rem;
		}

		.attendance-bar {
			width: 100%;
		}

		.card-body {
			padding: 1rem;
		}
	}
</style>
