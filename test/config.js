const test = require('tape');
const config = require('../config.js');

test('[config] ABOUT YOUR LEAVE', assert => {
  assert.equal(
    true,
    isDate(config.startDate) || config.startDate == null,
    `startDate must be YYYY-MM-DD format or is null`
  );
  assert.equal(
    typeof config.totalDaysLeave,
    'number',
    `totalDaysLeave must be a number`
  );
  assert.equal(
    config.totalDaysLeave >= 0,
    true,
    `totalDaysLeave must be a number greater or equal to 0`
  );
  assert.equal(
    typeof config.totalHolidays,
    'number',
    `totalHolidays must be a number`
  );
  assert.equal(
    config.totalHolidays >= 0,
    true,
    `totalHolidays must be a number greater or equal to 0`
  );
  assert.equal(
    true,
    isDate(config.returnDate) || config.returnDate == null,
    `returnDate must be YYYY-MM-DD format or is null`
  );
  assert.end();
});

test('[config] CALENDAR', assert => {
  assert.equal(
    typeof config.calendarSummary,
    'string',
    `calendarSummary must be a string`
  );
  assert.end();
});

test('[config] GMAIL VACATION RESPONSE', assert => {
  assert.equal(
    typeof config.vacationResponse,
    'string',
    `vacationResponse must be a string`
  );
  assert.end();
});

test('[config] EMAIL TO YOUR TEAM', assert => {
  assert.equal(typeof config.contacts, 'string', `contacts must be a string`);
  assert.equal(
    typeof config.emailSubject,
    'string',
    `emailSubject must be a string`
  );
  assert.equal(
    typeof config.emailMessage,
    'string',
    `emailMessage must be a string`
  );
  assert.end();
});

test('[config] SLACK STATUS', assert => {
  assert.equal(
    typeof config.statusEmoji,
    'string',
    `statusEmoji must be a string`
  );
  assert.equal(
    config.statusEmoji[0] + config.statusEmoji[config.statusEmoji.length - 1],
    '::',
    `statusEmoji must begin and end with a colon (:)`
  );
  assert.equal(
    typeof config.statusText,
    'string',
    `statusText must be a string`
  );
  assert.end();
});

test('[config] CONFIRMATION MESSAGE', assert => {
  assert.equal(
    typeof config.confirmation,
    'string',
    `confirmation must be a string`
  );
  assert.end();
});

const isDate = value => {
  const regex = /(19|20)\d\d[- .](0[1-9]|1[012])[- .](0[1-9]|[12][0-9]|3[01])/;
  return value instanceof Date || regex.test(value);
};
