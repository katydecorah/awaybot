const test = require('blue-tape');
const calc = require('../src/calc.js');
const moment = require('moment');

test('[calc] firstDayBack', assert => {
  return calc.firstDayBack('2018-02-07', 60, 0).then(d => {
    assert.equal(d, '2018-05-02');
  });
});

test('[calc] firstDayBack', assert => {
  return calc.firstDayBack('2018-02-19', 60, 0).then(d => {
    assert.equal(d, '2018-05-14');
  });
});

test('[calc] firstDayBack, start count on following Monday', assert => {
  return calc.firstDayBack('2018-02-17', 60, 0).then(d => {
    assert.equal(d, '2018-05-14');
  });
});

test('[calc] firstDayBack with holidays', assert => {
  return calc.firstDayBack('2017-12-17', 50, 2).then(d => {
    assert.equal(d, '2018-02-28');
  });
});

test('[calc] firstDayBack should not be a weekend', assert => {
  return calc.firstDayBack('2017-12-25', 60, 0).then(d => {
    assert.equal(d, '2018-03-19');
    assert.equal(moment(d, 'YYYY-MM-DD').format('ddd'), 'Mon');
  });
});

test('[calc] notAWeekend', assert => {
  assert.equal(calc.notAWeekend('2017-12-24'), '2017-12-25');
  assert.end();
});

test('[calc] notAWeekend', assert => {
  assert.equal(calc.notAWeekend('2017-12-23'), '2017-12-25');
  assert.end();
});

test('[calc] notAWeekend', assert => {
  assert.equal(calc.notAWeekend('2017-12-22'), '2017-12-22');
  assert.end();
});
