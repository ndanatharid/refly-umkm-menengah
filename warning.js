/**
 * warning.js - Premium Interactive Script
 * Dioptimalkan untuk transisi halus (Apple-style UX) & Kepatuhan Regulasi 2026
 */

document.addEventListener("DOMContentLoaded", () => {
    initScrollReveal();
    initSmoothFaq();
    initPremiumCtaFeedback();
});

/**
 * 1. SIMULASI SCROLL REVEAL (EFEK MUNCUL HALUS)
 * Membuat kartu-kartu muncul secara bertahap saat pengguna menggulir layar
 */
function initScrollReveal() {
    const targets = document.querySelectorAll('.card.glass, .timeline-item, .cta-box.glass');
    
    // Set style awal via JS agar jika JS gagal, konten tetap terlihat
    targets.forEach(target => {
        target.style.opacity = "0";
        target.style.transform = "translateY(24px)";
        target.style.transition = "opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px" // Terpicu sedikit sebelum masuk viewport
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Berikan sedikit delay acak agar efek staggered terasa organik
                setTimeout(() => {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                }, 50);
                observer.unobserve(entry.target); // Cukup satu kali reveal
            }
        });
    }, observerOptions);

    targets.forEach(target => revealObserver.observe(target));
}

/**
 * 2. FAQ INTERACTIVE ACCORDION MECHANISM
 * Mengubah list FAQ statis menjadi komponen interaktif yang terbuka dengan mulus
 */
function initSmoothFaq() {
    const faqBlocks = document.querySelectorAll('.timeline-section:last-of-type > div > div');
    
    faqBlocks.forEach(faq => {
        const question = faq.querySelector('h5');
        const answer = faq.querySelector('p');
        
        if (!question || !answer) return;

        // Styling via JS agar transisi tinggi vertikal berjalan mulus
        faq.style.cursor = "pointer";
        faq.style.transition = "background-color 0.3s ease, padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
        
        answer.style.maxHeight = "0px";
        answer.style.overflow = "hidden";
        answer.style.opacity = "0";
        answer.style.marginTop = "0px";
        answer.style.transition = "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, margin-top 0.4s ease";

        // Tambahkan ikon indikator di depan pertanyaan secara dinamis
        question.style.display = "flex";
        question.style.alignItems = "center";
        question.style.gap = "8px";
        question.innerHTML = `<i class="bi bi-chevron-right" style="font-size: 0.8rem; color: #34d399; transition: transform 0.3s ease;"></i> ` + question.innerHTML;
        
        const icon = question.querySelector('i.bi-chevron-right');

        // Event Handler Klik
        faq.addEventListener('click', () => {
            const isOpen = answer.style.maxHeight !== "0px";
            
            // Tutup semua FAQ terlebih dahulu jika ingin gaya akordion tunggal
            faqBlocks.forEach(item => {
                const p = item.querySelector('p');
                const i = item.querySelector('i.bi-chevron-right');
                if (p && i) {
                    p.style.maxHeight = "0px";
                    p.style.opacity = "0";
                    p.style.marginTop = "0px";
                    i.style.transform = "rotate(0deg)";
                    item.style.backgroundColor = "transparent";
                    item.style.paddingLeft = "0px";
                }
            });

            // Jika sebelumnya tertutup, sekarang buka
            if (!isOpen) {
                answer.style.maxHeight = "200px"; // Nilai aman batas tinggi teks
                answer.style.opacity = "1";
                answer.style.marginTop = "8px";
                icon.style.transform = "rotate(90deg)";
                faq.style.backgroundColor = "rgba(255, 255, 255, 0.02)";
                faq.style.paddingLeft = "8px";
            }
        });
    });
}

/**
 * 3. PREMIUM FEEDBACK BUTTON & DEADLINE TRACKER
 * Memberikan interaksi feedback haptic visual saat tombol diklik sebelum berpindah tab/aplikasi
 */
function initPremiumCtaFeedback() {
    const btnWa = document.querySelector('.btn-wa');
    
    if (btnWa) {
        btnWa.addEventListener('click', (e) => {
            // Efek scale-down instan meniru feedback tombol iOS/Apple
            btnWa.style.transform = "scale(0.96)";
            
            setTimeout(() => {
                btnWa.style.transform = "scale(1.03)";
            }, 100);
        });
    }

    // Konsol log pemberitahu sistem (Berguna untuk proses debug performa)
    console.log("🚀 Legalitas Premium Module: Active. Target Regulasi Terbaca: Penahapan Halal Oktober 2026.");
}
