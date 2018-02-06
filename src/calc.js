'use strict';

const moment = require('moment');
const config = require('../config.js');

module.exports.firstDayBack = (start, total, totalHolidays) => {
  return new Promise(resolve => {
    // start of leave should not  be a weekend
    if (!start) start = moment().format('YYYY-MM-DD');
    start = module.exports.notAWeekend(start);

    let day;
    let length =
      parseFloat(total) + (totalHolidays ? parseFloat(totalHolidays) : 0);
    for (let i = 0; i < length; i++) {
      day = moment(start, 'YYYY-MM-DD').add(i, 'day');
      if (
        moment(day).format('ddd') == 'Sun' ||
        moment(day).format('ddd') == 'Sat'
      )
        length++;
    }
    // return date should not be on the weekend
    let returnDate = module.exports.notAWeekend(
      moment(day)
        .add(1, 'day')
        .format('YYYY-MM-DD')
    );

    console.log(
      `\n\n✅  Your first day back is ${moment(returnDate, 'YYYY-MM-DD').format(
        'MMMM D, YYYY'
      )}`
    );
    if (config.returnDate) {
      resolve(config.returnDate);
    } else {
      resolve(returnDate);
    }
  });
};

module.exports.notAWeekend = date => {
  if (moment(date, 'YYYY-MM-DD').format('ddd') == 'Sat') {
    return moment(date)
      .add(2, 'day')
      .format('YYYY-MM-DD');
  } else if (moment(date, 'YYYY-MM-DD').format('ddd') == 'Sun') {
    return moment(date)
      .add(1, 'day')
      .format('YYYY-MM-DD');
  } else {
    return date;
  }
};
