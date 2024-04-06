const {appendZero} = require('../numbers.lib');

test("1 would be 01", () => {
    expect(appendZero(1)).toBe("01");
});

test("11 would be 11", () => {
    expect(appendZero(11)).toBe(11);
});

test("-5 would be 05 with positify", () => {
    expect(appendZero(-5)).toBe("05");
});

test("-5 would be -05 without positify", () => {
    expect(appendZero(-5, false)).toBe("-05");
});

test("-11 would be -11 without positify", () => {
    expect(appendZero(-11, false)).toBe(-11);
});

test("-11 would be 11 with positify", () => {
    expect(appendZero(-11)).toBe(11);
});