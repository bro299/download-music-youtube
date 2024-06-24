const form = document.getElementById('downloadForm'); // Ambil elemen formulir
const apiUrl = 'https://musikback.vercel.app/download'; // URL endpoint backend Vercel Anda

form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Mencegah pengiriman formulir langsung

  const urlInput = document.getElementById('urlInput').value; // Ambil nilai input URL
  console.log('URL YouTube:', urlInput);

  // Tampilkan indikator loading atau pesan "Processing"
  const downloadButton = form.querySelector('button[type="submit"]');
  downloadButton.disabled = true; // Menonaktifkan tombol submit
  downloadButton.textContent = 'Processing...'; // Mengubah teks tombol

  try {
    const response = await fetch(`${apiUrl}?url=${encodeURIComponent(urlInput)}`, {
      method: 'GET'
    });

    console.log('Response status:', response.status); // Log status respons

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText); // Log teks kesalahan dari respons
      throw new Error('Failed to download. Status: ' + response.status);
    }

    // Proses respons dari backend
    const blob = await response.blob(); // Mengubah respons menjadi Blob
    const url = window.URL.createObjectURL(blob); // Membuat URL dari Blob
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'audio.mp3'; // Nama file download
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);

    // Tampilkan pesan sukses atau lakukan tindakan lain sesuai kebutuhan
    alert('Download berhasil dilakukan!');
  } catch (error) {
    console.error('Error downloading:', error);
    alert('Terjadi kesalahan saat melakukan download. Periksa kembali URL yang Anda masukkan dan coba lagi.');
  } finally {
    // Kembalikan tombol submit ke kondisi awal setelah selesai atau terjadi error
    downloadButton.disabled = false;
    downloadButton.textContent = 'Download';
  }
});
