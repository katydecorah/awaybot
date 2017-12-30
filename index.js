'use strict';

const calc = require('./src/calc.js');
const slack = require('./src/slack.js');
const gmail = require('./src/gmail.js');
const calendar = require('./src/calendar.js');
const config = require('./config.js');

const away = (event, context, callback) => {
  calc
    .firstDayBack(config.startDate, config.totalDaysLeave, config.totalHolidays)
    .catch(err => callback(err))
    .then(calendar.createCalendarEvent) // create calendar event
    .catch(err => callback(err))
    .then(gmail.setVacationResponse) // set vacation auto-reply in gmail
    .catch(err => callback(err))
    .then(gmail.sendEmail) // send email to your team
    .catch(err => callback(err))
    .then(slack.updateSlackStatus) // update slack status
    .catch(err => callback(err))
    .then(slack.setAwayFromSlack) // set you away from slack
    .then(() => callback(null, `\n\n${config.confirmation}\n\n`))
    .catch(err => callback(err));
};

module.exports.away = away;
