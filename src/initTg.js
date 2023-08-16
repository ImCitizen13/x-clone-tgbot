const axios = require("axios");
const { TELEGRAM_API, WEBHOOK_URL } = require("./utils/utils");
const { webhookCallback } = require("./chatbot");
const bodyParser = require("body-parser");
const { Telegraf } = require('telegraf');
const { message } = require('telegraf/filters');


// Set TG webhook
const setTgWebhook = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`);
  console.log(res.data);
};

// Init bot commands
const initBotCommands = async () => {
  const res = await axios.post(`${TELEGRAM_API}/setMyCommands`, {
    commands:[
      { command: "Hi", 
        description: "This is a command to greet the bot" },
      {
        command: "Bye",
        description: "This is a command to bid the bot farewell",
      },
    ],
  });
  // console.log(res.data)
};

// Setup bot commands
const setCommands = async () => {};

function initBot(app) {
  setCommands();
  setTgWebhook();
  // Set Reciever method
  webhookCallback(app);
  // Set Bot Commands
  // initBotCommands();
}
module.exports = { initBot };
