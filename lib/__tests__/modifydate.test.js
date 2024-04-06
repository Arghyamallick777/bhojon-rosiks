const {modifyAKADate} = require('../date.lib');

test("Increase date by 5 min", () => {
    const date = new Date();
    const testDate = new Date();
    testDate.setMinutes(testDate.getMinutes() + 5);
    const _date = modifyAKADate(date, '+5min');
    expect(_date.toISOString()).toBe(testDate.toISOString());
});