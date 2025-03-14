<script>
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import SignAttendance from '$lib/signAttendance';
	import Swal from 'sweetalert2';
	import { supabase } from '$lib/supabaseClient';
	import Meetings from '$lib/meetings';

	let attendanceSigned = $state([]);
	let scanner = $state(false);
	let scanResult = $state('');

	let meetings = $state(null);

	let uids = $state([]);

	onMount(() => {
		// Subscribe to realtime changes for the 'uids' table
		const subscription = supabase
			.channel('public:checker') // Channel name
			.on(
				'postgres_changes',
				{ event: 'UPDATE', schema: 'public', table: 'checker' },
				(payload) => {
					// Handle update
					uids = payload.new.uids;
					attendanceSigned = uids;
					meetings = payload.new.meetings;
				}
			)
			.subscribe();

		// Cleanup subscription on component unmount
		return () => {
			supabase.removeChannel(subscription);
		};
	});

	$effect(async () => {
		// Fetch initial scanned uids & meetngs count
		const { data, error } = await supabase
			.from('checker')
			.select('*')
			.eq('id', 1)
			.order('created_at', { ascending: false });

		if (error) console.error('Error fetching blogs:', error);
		else {
			uids = data[0].uids;
			attendanceSigned = uids;
			meetings = data[0].meetings;
		}
	});

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

	const insertUids = (uids) => {
		try {
			fetch('/database/insertion/uids', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					uids: { uids: uids }
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
				})
				.catch((error) => console.log('Error ', error));
		} catch (error) {
			console.log('Error', error);
		}
	};

	const Scan = async () => {
		// Initialize the scanner
		scanner = new Html5Qrcode('qr-reader');

		// Start scanning
		try {
			await scanner.start(
				{ facingMode: 'environment' }, // Use the rear camera
				{
					fps: 10, // Frames per second
					qrbox: 300 // Size of the QR code scanning box
				},
				(decodedText) => {
					// Handle the scanned result
					scanResult = decodedText;

					if (!attendanceSigned.includes(scanResult)) {
						const result = SignAttendance(scanResult);
						console.log('Scanned:', decodedText);

						attendanceSigned.push(scanResult);

						insertUids(attendanceSigned);

						alerts('success', 'Attendance Signed Successfully');
					} else {
						console.log('Attendance Already Signed!');
					}
				},
				(error) => {
					//console.error('Error scanning:', error);
				}
			);
		} catch (error) {
			alerts('error', 'Failed to start scanner');
			console.error('Failed to start scanner:', error);
		}
	};

	const closeScanner = () => {
		if (scanner) {
			scanner
				.stop()
				.then(() => {
					console.log('Scanner stopped.');
				})
				.catch((error) => {
					console.error('Failed to stop scanner:', error);
				});
		}

		scanner = false;
	};

	onDestroy(() => {
		// Clean up the scanner when the component is destroyed
		if (scanner) {
			scanner
				.stop()
				.then(() => {
					console.log('Scanner stopped.');
				})
				.catch((error) => {
					console.error('Failed to stop scanner:', error);
				});
		}
	});

	const clearAttendance = async () => {
		// Show the confirmation dialog
		const result = await Swal.fire({
			title: 'Are you sure you want to clear attendance? 🤔',
			text: 'This action cannot be undone 💀',
			html: ``,
			background: '#1a1a1a',
			color: 'whitesmoke',
			showDenyButton: true,
			confirmButtonText: 'Yes',
			denyButtonText: 'No',
			customClass: {
				confirmButton: 'neon-confirm-button',
				denyButton: 'neon-deny-button'
			},
			buttonsStyling: false
		});

		// Handle the result of the confirmation dialog
		if (result.isConfirmed) {
			await insertUids([]);
			if (attendanceSigned) {
				alerts('success', 'Attendance Cleared Successfully');
			} else {
				alerts('error', 'An error occurred!');
			}
		} else if (result.isDenied) {
			return false;
		}
	};

	const updateMeetings = () => {
		Swal.fire({
			title: 'Input the meetings count.',
			input: 'number',
			inputAttributes: {
				autocapitalize: 'off'
			},
			showCancelButton: true,
			confirmButtonText: 'Update',
			background: '#1a1a1a',
			color: 'whitesmoke',
			showLoaderOnConfirm: true,
			preConfirm: async (count) => {
				try {
					if (count < 1) {
						alerts('error', 'Meetings count cannot be less than 1');
					} else {
						let isSuccess = await Meetings(count);

						if (isSuccess) {
							console.log('Success');
							alerts('success', 'Meetings Updated Successfully');
						} else {
							alerts('error', 'An error Occurred');
							console.log('Failed');
						}
					}
				} catch (error) {
					Swal.showValidationMessage(`
        Request failed: ${error}
      `);
				}
			},
			allowOutsideClick: () => !Swal.isLoading()
		});
	};
</script>

<main style="overflow-x: hidden;">
	<h2 class="mb-4 display-4 text-center">Attendance</h2>
	<!-- QR Reader -->
	<div id="qr-reader" class="mb-5 px-2"></div>

	<!-- Buttons Section -->
	{#if !scanner}
		<div class="text-center row justify-content-center g-3">
			<div class="col-12 col-md-auto">
				<button
					class=" btn btn-outline-primary w-100"
					onclick={() => {
						Scan();
					}}>Scan QR-Codes</button
				>
			</div>
			<div class="col-12 col-md-auto">
				{#if attendanceSigned.length > 0}
					<button class="btn btn-outline-danger w-100" onclick={clearAttendance}>
						Clear Attendance
					</button>
				{/if}
			</div>
			<div class="col-12 col-md-auto">
				<button
					class="btn btn-outline-warning w-100"
					onclick={() => {
						updateMeetings();
					}}
				>
					Set Meetings
				</button>
			</div>
		</div>
	{:else}
		<div class="text-center">
			<button class="btn btn-outline-danger py-2" onclick={closeScanner}> Close </button>
		</div>
	{/if}

	<!-- Attendance Section -->
	{#await uids}
		<p class="text-center mt-3">Loading...</p>
	{:then}
		{#if uids.length > 0}
			<h2 class="mt-5 text-center">
				Attendance Signed: <span class="text-success">{uids.length}</span>
			</h2>
		{/if}
	{/await}

	<!--Meetings count section-->
	{#if meetings}
		<h2 class="mt-3 text-center">
			Total Meetings No: <span class="text-success">{meetings}</span>
		</h2>
	{/if}
</main>

<style>
	#qr-reader {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}

	@media (max-width: 769px) {
		.btn {
			width: 50% !important;
		}
	}
</style>
