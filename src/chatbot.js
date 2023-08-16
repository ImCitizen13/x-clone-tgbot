const { URI, TELEGRAM_API } = require("./utils/utils");
const bodyParser = require("body-parser");

// Set Reciever method
// Webhook receiver callback
const webhookCallback = (app) => {
  app.post(URI, async (req, res) => {
    console.log(req.body);

    const chatId = req.body.message.chat.id;
    await sendMessage(chatId, "You got it fam!");

    return res.send();
  });
};



// Send a message using the TG sendMessage
const sendMessage = async (chatId, messageToSend) => {
    return await axios.post(`${TELEGRAM_API}/sendMessage`, {
      chat_id: chatId,
      text: messageToSend,
    });
  };

module.exports = { webhookCallback };
