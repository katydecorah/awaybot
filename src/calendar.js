'use strict';

const google = require('googleapis');
const fs = require('fs');
const quickstart = require('./quickstart.js');
const moment = require('moment');
const config = require('../config.js');

const createCalendarEvent = date => {
  return new Promise((resolve, reject) => {
    fs.readFile('client_secret.json', function processClientSecrets(
      err,
      content
    ) {
      if (err) {
        console.log(`Error loading client secret file: ${err}`);
        return;
      }
      quickstart.authorize(JSON.parse(content), function updateVacation(auth) {
        const calendar = google.calendar('v3');
        calendar.events.insert(
          {
            auth: auth,
            calendarId: 'primary',
            resource: {
              summary: config.calendarSummary.replace(
                /{date}/g,
                moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY')
              ),
              start: {
                date: moment().format('YYYY-MM-DD')
              },
              end: {
                date: moment(date, 'YYYY-MM-DD').format('YYYY-MM-DD')
              }
            }
          },
          err => {
            if (err) reject(`The Calendar API returned an error: ${err}`);
            console.log(
              `\n\n✅  Calendar event created until ${moment(
                date,
                'YYYY-MM-DD'
              ).format('MMMM D, YYYY')}`
            );
            resolve(date);
          }
        );
      });
    });
  });
};

module.exports.createCalendarEvent = createCalendarEvent;
