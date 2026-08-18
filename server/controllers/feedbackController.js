const emailService = require("../services/emailService");
const whatsappService = require("../services/whatsappService");

const feedbackController = {};

// =====================================
// KIRIM PENGADUAN
// =====================================

feedbackController.send = async (req, res) => {
  try {
    const { nama, email, kategori, pesan } = req.body;

    // =====================================
    // VALIDASI DATA
    // =====================================

    if (!nama || !email || !kategori || !pesan) {
      return res.status(400).json({
        success: false,
        message: "Nama, email, kategori, dan pesan wajib diisi.",
      });
    }

    // =====================================
    // VALIDASI EMAIL
    // =====================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Format email tidak valid.",
      });
    }

    // =====================================
    // BERSIHKAN DATA
    // =====================================

    const feedbackData = {
      nama: nama.trim(),
      email: email.trim(),
      kategori: kategori.trim(),
      pesan: pesan.trim(),
    };

    // =====================================
    // FORMAT PESAN WHATSAPP
    // =====================================

    const whatsappMessage = `
🚨 *LAYANAN & PENGADUAN MASYARAKAT*

*JagaBumi*
Sistem Peringatan Dini Longsor

━━━━━━━━━━━━━━━━━━━━

👤 *DATA PENGIRIM*

Nama     : ${feedbackData.nama}
Email    : ${feedbackData.email}
Kategori : ${feedbackData.kategori}

━━━━━━━━━━━━━━━━━━━━

📝 *PESAN / PENGADUAN*

${feedbackData.pesan}

━━━━━━━━━━━━━━━━━━━━

📍 *LOKASI MONITORING*

Pusuk Sembalun
Kabupaten Lombok Timur
Nusa Tenggara Barat

━━━━━━━━━━━━━━━━━━━━

Pesan dikirim melalui website JagaBumi.
    `.trim();

    // =====================================
    // KIRIM EMAIL
    // =====================================

    let emailSuccess = false;

    try {
      await emailService.sendEmail(feedbackData);

      emailSuccess = true;

      console.log("✅ Pengaduan berhasil dikirim melalui Email.");
    } catch (error) {
      console.error("❌ Email gagal:", error.message);
    }

    // =====================================
    // KIRIM WHATSAPP
    // =====================================

    let whatsappSuccess = false;

    try {
      const result = await whatsappService.sendWhatsApp(process.env.FONNTE_TARGET, whatsappMessage);

      if (result) {
        whatsappSuccess = true;

        console.log("✅ Pengaduan berhasil dikirim melalui WhatsApp.");
      }
    } catch (error) {
      console.error("❌ WhatsApp gagal:", error.message);
    }

    // =====================================
    // KEDUANYA GAGAL
    // =====================================

    if (!emailSuccess && !whatsappSuccess) {
      return res.status(500).json({
        success: false,
        message: "Pengaduan gagal dikirim. Silakan coba kembali.",
        email: false,
        whatsapp: false,
      });
    }

    // =====================================
    // RESPONSE
    // =====================================

    return res.status(200).json({
      success: true,
      message: "Pengaduan berhasil dikirim.",
      email: emailSuccess,
      whatsapp: whatsappSuccess,
    });
  } catch (error) {
    console.error("================================");

    console.error("FEEDBACK ERROR:");

    console.error(error);

    console.error("================================");

    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server.",
    });
  }
};

module.exports = feedbackController;
