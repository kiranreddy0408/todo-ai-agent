
// Service to send messages to Slack via Incoming Webhook
const axios = require('axios');
require('dotenv').config();

async function sendToSlack(summary) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error('SLACK_WEBHOOK_URL not set');

  const message = {
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*AI-Generated Summary:*\n${summary}`,
        },
      },
    ],
  };

  await axios.post(webhookUrl, message);
}

module.exports = { sendToSlack };
