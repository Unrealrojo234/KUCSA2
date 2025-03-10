<script>
	import { onMount, onDestroy } from 'svelte';
	import { Html5Qrcode } from 'html5-qrcode';

	let scanner;
	let scanResult = '';

	onMount(async () => {
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
					console.log('Scanned:', decodedText);
				},
				(error) => {
					console.error('Error scanning:', error);
				}
			);
		} catch (error) {
			console.error('Failed to start scanner:', error);
		}
	});

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
<p>Scanned QR Code: {scanResult}</p>

<style>
	#qr-reader {
		width: 100%;
		max-width: 500px;
		margin: 0 auto;
	}
</style>
