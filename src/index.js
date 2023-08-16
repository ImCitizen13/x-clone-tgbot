require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const { initBot } = require("./initTg");



// Express app init
const app = express();
app.use(bodyParser.json());

// Init Chatbot
initBot(app)

// Listen with the webhook on port 5000
app.listen(process.env.PORT || 5000, async () => {
  console.log("🐧 listener is running on port ", process.env.PORT || 5000);
  // initBot(app)
});
