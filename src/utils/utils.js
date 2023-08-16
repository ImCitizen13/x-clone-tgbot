const { TELEGRAM_API_KEY, SERVER_URL } = process.env;
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_API_KEY}`;
const URI = `/webhook/${TELEGRAM_API_KEY}`;
const WEBHOOK_URL = SERVER_URL + URI;

module.exports = { TELEGRAM_API, URI ,WEBHOOK_URL };
