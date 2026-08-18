const nodemailer = require("nodemailer");

// =====================================
// EMAIL TRANSPORTER
// =====================================

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT || 587),

  secure: process.env.MAIL_SECURE === "true",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// =====================================
// KIRIM EMAIL PENGADUAN
// =====================================

async function sendEmail({ nama, email, kategori, pesan }) {
  const mailOptions = {
    from: `"JagaBumi" <${process.env.MAIL_USER}>`,

    to: process.env.MAIL_TO,

    replyTo: email,

    subject: `[JagaBumi] ${kategori}`,

    text: `
LAYANAN & PENGADUAN MASYARAKAT

JagaBumi
Sistem Peringatan Dini Longsor

================================

DATA PENGIRIM

Nama     : ${nama}
Email    : ${email}
Kategori : ${kategori}

================================

PESAN / PENGADUAN

${pesan}

================================

Pesan dikirim melalui website JagaBumi.

Lokasi monitoring:
Pusuk Sembalun, Kabupaten Lombok Timur,
Nusa Tenggara Barat.
    `.trim(),
  };

  const result = await transporter.sendMail(mailOptions);

  console.log("================================");
  console.log("EMAIL BERHASIL TERKIRIM");
  console.log("Message ID :", result.messageId);
  console.log("================================");

  return result;
}

module.exports = {
  sendEmail,
};
