'use strict';

const calc = require('./src/calc.js');
const slack = require('./src/slack.js');
const gmail = require('./src/gmail.js');
const calendar = require('./src/calendar.js');
const config = require('./config.js');

module.exports.away = (event, context, callback) => {
  calc
    .firstDayBack(config.startDate, config.totalDaysLeave, config.totalHolidays) // calculate first day back
    .then(calendar.createCalendarEvent) // create calendar event
    .then(gmail.setVacationResponse) // set vacation auto-reply in gmail
    .then(gmail.sendEmail) // send email to your team
    .then(slack.updateSlackStatus) // update slack status
    .then(slack.setAwayFromSlack) // set you away from slack
    .then(() => callback(null, `\n\n${config.confirmation}\n\n`))
    .catch(err => callback(err));
};
