// Use {date} and to replace that value with your return date.
module.exports = {
  ////////////////////////////
  // ABOUT YOUR LEAVE
  ////////////////////////////
  // day your leave begins in YYYY-MM-DD format or null if it's today
  startDate: null,
  // total number of days of your leave
  totalDaysLeave: 60,
  // number of company holidays during your leave
  totalHolidays: 0,
  // your return date in YYYY-MM-DD format or null to allow it to be calculated for you
  returnDate: null,

  ////////////////////////////
  // CALENDAR
  ////////////////////////////
  // name of the event that will block out your calendar
  calendarSummary: 'On maternity leave',

  ////////////////////////////
  // GMAIL VACATION RESPONSE
  ////////////////////////////
  // your email auto response message
  vacationResponse:
    'Hello, I am on maternity leave and will be back in the office on {date}.',

  ////////////////////////////
  // EMAIL TO YOUR TEAM
  ////////////////////////////
  // list of comma-seperated emails that you want to email
  contacts: 'person@email.com,anotherperson@email.com',
  /// subject of the email you are sending
  emailSubject: 'On maternity leave starting now',
  // message of them email you are sending
  emailMessage:
    'Hello, The baby is on the way! My leave has begun and I will return on {date}.',

  ////////////////////////////
  // SLACK STATUS
  ////////////////////////////
  // set the slack emoji
  statusEmoji: ':baby:',
  // slack status message that will conclude with your return date
  statusText: 'back from maternity leave on {date}',

  ////////////////////////////
  // CONFIRMATION MESSAGE
  ////////////////////////////
  // message you'd like to receive once the script finishes successfully
  confirmation: '💜  Take a deep breath, everything is taken care of'
};
