// Ganti dengan URL Aplikasi Web (Web App URL) dari Google Apps Script Anda
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzZRI2b5XbR-q97_v5bcIox9WaNzuSI6xtQNbx1iure_t07Z3LwGroPiPvsD5297a-e/exec'; 

const form = document.getElementById('guestbook-form');
const feedContainer = document.getElementById('guestbook-feed-container');
const submitBtn = document.getElementById('submit-btn');

// Fungsi Sanitasi (Mencegah XSS)
function sanitizeHTML(str) {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
}

// Fungsi merender data dari JSON ke DOM HTML
function renderFeed(dataArray) {
    feedContainer.innerHTML = ''; // Kosongkan state loading
    dataArray.forEach(item => {
        const card = document.createElement('div');
        card.className = 'comment-card';
        card.innerHTML = `
            <strong>${sanitizeHTML(item.nama)}</strong>
            <span class="badge">${sanitizeHTML(item.kehadiran)}</span>
            <p style="margin-top: 8px;">${sanitizeHTML(item.pesan)}</p>
        `;
        feedContainer.appendChild(card);
    });
}

// Fungsi memuat ucapan dari Google Sheets (GET)
async function fetchComments() {
    try {
        const response = await fetch(SCRIPT_URL);
        const data = await response.json();
        renderFeed(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        feedContainer.innerHTML = '<p>Gagal memuat ucapan tamu.</p>';
    }
}

// Menangani pengiriman formulir (POST)
form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // Ubah status tombol untuk UX yang baik
    submitBtn.textContent = 'Mengirim...';
    submitBtn.disabled = true;

    try {
        // Ambil data langsung dari elemen formulir
        const requestBody = new FormData(form);
        
        // Kirim asinkronus ke Google Sheets
        await fetch(SCRIPT_URL, { method: 'POST', body: requestBody });
        
        // Reset formulir & perbarui feed secara real-time
        form.reset();
        await fetchComments();
        
    } catch (error) {
        console.error('Gagal mengirim data:', error);
        alert('Terjadi kesalahan jaringan.');
    } finally {
        submitBtn.textContent = 'Kirim Ucapan';
        submitBtn.disabled = false;
    }
});

// Jalankan fetch saat halaman pertama kali dimuat
fetchComments();
