<script>
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';
	import SignAttendance from '$lib/signAttendance';
	import Swal from 'sweetalert2';

	let attendanceSigned = $state([]);
	let scanner = $state(false);
	let scanResult = $state('');

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
</script>

<h1 class="text-center">Admins Dashboard</h1>
<div id="qr-reader"></div>
{#if scanResult}
	<p class="text-center">Scanned QR Code: {scanResult}</p>
{/if}
{#if !scanner}
	<div class="text-center">
		<button
			class="cta-button btn"
			onclick={() => {
				Scan();
			}}>Scan</button
		>
	</div>
{:else}
	<div class="text-center">
		<button class="cta-button btn" onclick={closeScanner}>Close</button>
	</div>
{/if}

<style>
	#qr-reader {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}
</style>
