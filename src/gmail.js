'use strict';

const google = require('googleapis');
const fs = require('fs');
const quickstart = require('./quickstart.js');
const moment = require('moment');
const config = require('../config.js');

const sendEmail = date => {
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
        const gmail = google.gmail('v1');
        gmail.users.messages.send(
          {
            auth: auth,
            userId: 'me',
            resource: {
              raw: module.exports.makeBody(
                config.contacts,
                config.emailSubject.replace(
                  /{date}/g,
                  moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY')
                ),
                config.emailMessage.replace(
                  /{date}/g,
                  moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY')
                )
              )
            }
          },
          err => {
            if (err) reject(`The Gmail API returned an error: ${err}`);
            console.log(`\n\n✅  Email sent to ${config.contacts}`);
            resolve(date);
          }
        );
      });
    });
  });
};

const makeBody = (to, subject, message) => {
  const str = [
    "Content-Type: text/plain; charset='UTF-8'\n",
    'MIME-Version: 1.0\n',
    'Content-Transfer-Encoding: 7bit\n',
    'to: ',
    to,
    '\n',
    'subject: ',
    subject,
    '\n\n',
    message
  ].join('');
  return new Buffer(str)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
};

const setVacationResponse = date => {
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
        const gmail = google.gmail('v1');
        const vacation = {
          enableAutoReply: true,
          responseBodyPlainText: config.vacationResponse.replace(
            /{date}/g,
            moment(date, 'YYYY-MM-DD').format('MMMM D, YYYY')
          ),
          restrictToContacts: false,
          restrictToDomain: false
        };
        gmail.users.settings.updateVacation(
          {
            auth: auth,
            userId: 'me',
            resource: vacation
          },
          (err, res) => {
            if (err) reject(`The Gmail API returned an error: ${err}`);
            if (!res.enableAutoReply)
              reject(`The API returned an error: ${JSON.stringify(res)}`);
            console.log(
              `\n\n✅  Vacation response set: ${vacation.responseBodyPlainText}`
            );
            resolve(date);
          }
        );
      });
    });
  });
};

module.exports = {
  setVacationResponse,
  sendEmail,
  makeBody
};
