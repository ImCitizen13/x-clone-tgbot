require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

// Urls
const { TELEGRAM_API_KEY, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_KEY}`;
const URI = `/webhook/${TELEGRAM_API_KEY}`;
const WEBHOOK_URL = SERVER_URL + URI;

// Express app init
const app = express();
app.use(bodyParser.json());

// Set TG webhook
const setTgWebhook = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

// Send a message using the TG sendMessage
const sendMessage = async (chatId, messageToSend) => {
  return await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: messageToSend,
  });
};

// Webhook receiver
app.post(URI, async (req, res) => {
  console.log(req.body);

  const chatId = req.body.message.chat.id;
  await sendMessage(chatId, "You got it fam!");

  return res.send();
});

// Listen with the webhook on port 5000
app.listen(process.env.PORT || 5000, async () => {
  console.log("🐧 listener is running on port ", process.env.PORT || 5000);
  await setTgWebhook();
});
