'use strict';

const moment = require('moment');
const request = require('request');
const config = require('../config.js');

module.exports.setAwayFromSlack = () => {
  const opts = {
    url: `https://slack.com/api/users.setPresence?token=${
      process.env.SlackAccessToken
    }&presence=away`
  };
  return new Promise((resolve, reject) => {
    request.post(opts, (err, res, body) => {
      if (err) reject(`The Slack API returned an error: ${err}`);
      if (!JSON.parse(body).ok)
        reject(`${JSON.parse(body).error} from setAwayFromSlack()`);
      console.log(`\n\n✅  You are set away on Slack`);
      resolve(body);
    });
  });
};

module.exports.updateSlackStatus = date => {
  const profile = {
    status_text: config.statusText.replace(
      /{date}/g,
      moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY')
    ),
    status_emoji: config.statusEmoji
  };
  const opts = {
    url: `https://slack.com/api/users.profile.set?token=${
      process.env.SlackAccessToken
    }&profile=${encodeURIComponent(JSON.stringify(profile))}&user=${
      process.env.SlackUser
    }`
  };
  return new Promise((resolve, reject) => {
    request.post(opts, (err, res, body) => {
      if (err) reject(`The Slack API returned an error: ${err}`);
      if (!JSON.parse(body).ok)
        reject(`${JSON.parse(body).error} from updateSlackStatus()`);
      console.log(
        `\n\n✅  Your Slack status is updated: ${profile.status_text}`
      );
      resolve(body);
    });
  });
};
