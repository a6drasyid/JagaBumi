const axios = require("axios");

async function sendWhatsApp(target, message) {
  try {
    const response = await axios.post(
      "https://api.fonnte.com/send",
      {
        target,
        message,
      },
      {
        headers: {
          Authorization: process.env.FONNTE_TOKEN,
        },
      }
    );

    console.log("================================");
    console.log("WHATSAPP BERHASIL");
    console.log(response.data);
    console.log("================================");

    return response.data;
  } catch (err) {
    console.log("================================");
    console.log("WHATSAPP GAGAL");

    if (err.response) {
      console.log(err.response.data);
    } else {
      console.log(err.message);
    }

    console.log("================================");
  }
}

module.exports = {
  sendWhatsApp,
};
