/* =====================================================
   SIHALAL SERVICE APP
   Premium Navigation + Order Modal + Telegram Bot
===================================================== */

/* =====================================================
   PAGE NAVIGATION
===================================================== */

function switchPage(pageId, element) {

    const pages = document.querySelectorAll('.page');

    pages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);

    if (targetPage) {
        targetPage.classList.add('active');
    }

    if (element) {

        document.querySelectorAll('.nav-item')
        .forEach(item => {
            item.classList.remove('active');
        });

        element.classList.add('active');
    }

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


/* =====================================================
   ORDER MODAL
===================================================== */

function openOrderForm(packageName, packagePrice) {

    const modal = document.getElementById("orderModal");

    if (!modal) return;

    modal.classList.add("active");

    document.body.style.overflow = "hidden";

    const packageTitle =
        document.getElementById("selectedPackage");

    if (packageTitle) {
        packageTitle.textContent = packageName;
    }

    const packageNameInput =
        document.getElementById("packageName");

    if (packageNameInput) {
        packageNameInput.value = packageName;
    }

    const packagePriceInput =
        document.getElementById("packagePrice");

    if (packagePriceInput) {
        packagePriceInput.value = packagePrice;
    }
}

function closeOrderForm() {

    const modal =
        document.getElementById("orderModal");

    if (!modal) return;

    modal.classList.remove("active");

    document.body.style.overflow = "";
}


/* =====================================================
   CLOSE MODAL WHEN CLICK BACKDROP
===================================================== */

document.addEventListener("click", function(e) {

    const modal =
        document.getElementById("orderModal");

    if (!modal) return;

    if (e.target === modal) {
        closeOrderForm();
    }

});


/* =====================================================
   TELEGRAM BOT
===================================================== */

const BOT_TOKEN = "7948256718:AAGrM8pLOjvSaw7-4JHZnER-XWEa6RAdog8";
const CHAT_ID = "8063917939";


/* =====================================================
   FORM SUBMIT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("orderForm");

    if (!form) {

        console.warn(
            "orderForm tidak ditemukan."
        );

        return;
    }

    form.addEventListener(
        "submit",
        async function(e) {

            e.preventDefault();

            const submitButton =
                this.querySelector(
                    'button[type="submit"]'
                );

            if (submitButton) {

                submitButton.disabled = true;

                submitButton.innerHTML =
                    "Mengirim...";
            }

            try {

                const paket =
                    document.getElementById("packageName")?.value || "-";

                const harga =
                    document.getElementById("packagePrice")?.value || "-";

                const nama =
                    document.getElementById("nama")?.value || "-";

                const nik =
                    document.getElementById("nik")?.value || "-";

                const wa =
                    document.getElementById("wa")?.value || "-";

                const email =
                    document.getElementById("email")?.value || "-";

                const alamat =
                    document.getElementById("alamat")?.value || "-";

                const usaha =
                    document.getElementById("usaha")?.value || "-";

                const bentuk =
                    document.getElementById("bentuk")?.value || "-";

                const nib =
                    document.getElementById("nib")?.value || "-";

                const npwp =
                    document.getElementById("npwp")?.value || "-";

                const kbli =
                    document.getElementById("kbli")?.value || "-";

                const produk =
                    document.getElementById("produk")?.value || "-";

                const produksi =
                    document.getElementById("produksi")?.value || "-";

                const catatan =
                    document.getElementById("catatan")?.value || "-";

                const waktu =
                    new Date().toLocaleString("id-ID");

                const pesan = `
🔔 ORDER REFLY UMKM MENEGAH

━━━━━━━━━━━━━━

📦 Paket
${paket}

💰 Harga
Rp ${harga}

━━━━━━━━━━━━━━

👤 DATA PEMOHON

• Nama : ${nama}
• NIK : ${nik}
• WA : ${wa}
• Email : ${email}

📍 Alamat
${alamat}

━━━━━━━━━━━━━━

🏢 DATA USAHA

• Nama Usaha : ${usaha}
• Bentuk Usaha : ${bentuk}
• NIB : ${nib}
• NPWP : ${npwp}
• KBLI : ${kbli}

━━━━━━━━━━━━━━

🍜 DATA PRODUK

• Produk : ${produk}

📍 Lokasi Produksi
${produksi}

━━━━━━━━━━━━━━

📝 Catatan

${catatan}

━━━━━━━━━━━━━━

⏰ ${waktu}
🌐 Website Sihalal Service
`;

                const response =
                    await fetch(
                        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                chat_id: CHAT_ID,
                                text: pesan
                            })
                        }
                    );

                const result =
                    await response.json();

                if (result.ok) {

                    alert(
                        "Data berhasil dikirim."
                    );

                    form.reset();

                    closeOrderForm();

                } else {

                    console.error(result);

                    alert(
                        "Gagal mengirim data ke Telegram."
                    );
                }

            } catch (error) {

                console.error(error);

                alert(
                    "Terjadi kesalahan koneksi."
                );

            } finally {

                if (submitButton) {

                    submitButton.disabled = false;

                    submitButton.innerHTML =
                        "Kirim Permohonan";
                }
            }
        }
    );
});