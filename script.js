// Tanggal Pernikahan
const countDownDate = new Date("Dec 12, 2026 08:00:00").getTime();

// Update hitungan mundur setiap 1 detik
const x = setInterval(function() {

    // Waktu sekarang
    const now = new Date().getTime();

    // Selisih waktu
    const distance = countDownDate - now;

    // Kalkulasi waktu
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Tampilkan di HTML
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Jika waktu habis
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "<h3>Acara Telah Dimulai</h3>";
    }
}, 1000);

// RSVP to WhatsApp
document.getElementById('rsvp-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nama = this.querySelector('input[type="text"]').value;
    const kehadiran = this.querySelector('select').value;
    const pesan = this.querySelector('textarea').value;
    
    // Ganti nomor ini dengan nomor WhatsApp yang dituju
    const noWA = "6281234567890"; 
    
    const textWA = `Halo, saya ${nama}.%0A%0ASaya ingin konfirmasi bahwa saya *${kehadiran === 'ya' ? 'AKAN HADIR' : 'TIDAK BISA HADIR'}* pada acara pernikahan.%0A%0APesan/Doa: ${pesan}`;
    
    window.open(`https://wa.me/${noWA}?text=${textWA}`, '_blank');
});
