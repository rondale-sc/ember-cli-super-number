import NumberFormatter from "ember-super-number/utils/number-formatter";


module('unit:number-formatter:adds');

test('it adds negative numbers properly', function(){
  expect(1);
  var nf = new NumberFormatter(-3);

  nf.add(1);
  strictEqual(nf.toString(), "-2");
});

test("it has a default value of zero", function() {
  expect(1);

  var nf = new NumberFormatter();
  strictEqual(nf.toString(), "0");
});

test('it adds strings and integers', function(){
  expect(1);

  var nf = new NumberFormatter("1");

  nf.add(1);
  strictEqual(nf.toString(), "2");
});

test('it adds strings and strings', function(){
  expect(1);

  var nf = new NumberFormatter("1");

  nf.add("1");
  strictEqual(nf.toString(), "2");
});

test('it adds integers and integers', function(){
  expect(1);

  var nf = new NumberFormatter(1);

  nf.add(1);
  strictEqual(nf.toString(), "2");
});

test('adds integers and decimals', function(){
  expect(1);

  var nf = new NumberFormatter(1);

  nf.add(0.5);
  strictEqual(nf.toString(), "1.5");
});

module('unit:number-formatter:subtracts');

test('it subtracts negative numbers properly', function(){
  expect(1);
  var nf = new NumberFormatter(-3);

  nf.subtract(1);
  strictEqual(nf.toString(), "-4");
});

test('it substracts strings and integers', function(){
  expect(1);

  var nf = new NumberFormatter("3");

  nf.subtract(2);
  strictEqual(nf.toString(), "1");
});

test('it subracts strings and strings', function() {
  expect(1);

  var nf = new NumberFormatter("1");

  nf.subtract("1");
  strictEqual(nf.toString(), "0");
});

test('it subracts integers and integers', function() {
  expect(1);

  var nf = new NumberFormatter(1);

  nf.subtract(1);
  strictEqual(nf.toString(), "0");
});

test('subtract integers and decimals', function() {
  expect(1);

  var nf = new NumberFormatter(3);

  nf.subtract(1.5);
  strictEqual(nf.toString(), "1.5");
});

module('unit:number-formatter:scale');


test('it accepts a scale option', function() {
  expect(1);

  var nf = new NumberFormatter(1, {scale: 2});
  strictEqual(nf.toString(), "1.00");
});

module('unit:number-formatter');

test('it accepts negative numbers with a scale option', function() {
  expect(1);

  var nf = new NumberFormatter(-1, {scale: 2});
  strictEqual(nf.toString(), "-1.00");
});

test('it accepts options without optionally supplied value', function() {
  expect(1);

  var nf = new NumberFormatter({scale: 2});
  strictEqual(nf.toString(), "0.00");
});

module('unit:number-formatter:padding');

test('pads number to specified precision', function() {
  expect(1);

  var nf = new NumberFormatter(1, {precision: 5});
  strictEqual(nf.toString(), "00001");
});

test('pads number to specified precision and scale', function() {
  expect(1);

  var nf = new NumberFormatter(1.5, {precision: 5, scale: 2});
  strictEqual(nf.toString(), "001.50");
});

module('unit:number-formatter:garbage_input');

test('when value is null it properly casts value to 0', function(){
  expect(1);
  var nf = new NumberFormatter(null);
  strictEqual(nf.toString(), "0");
});

test('when provided a step - adds to nearest factor of step', function(){
  expect(1);
  var nf = new NumberFormatter("BLLARGLE", {step: 5});
  strictEqual(nf.toString(), "0");
});

test('it defaults value to 0 when input value is garbage', function(){
  expect(1);

  var nf = new NumberFormatter('THIS IS NOT VALID INPUT');
  strictEqual(nf.toString(), "0");
});

module('unit:number-formatter:snapToNearestStep');

test('when provided a step - initializes to nearest factor of step', function(){
  expect(1);
  var nf = new NumberFormatter(3, {step: 5});
  strictEqual(nf.toString(), "5");
});


test('when provided a step = adds to nearest factor of step', function(){
  expect(1);
  var nf = new NumberFormatter(3, {step: 5});
  nf.add(3);
  strictEqual(nf.toString(), "10");
});

test('when provided a step = subtracts to nearest factor of step', function(){
  expect(1);
  var nf = new NumberFormatter(3, {step: 5});
  nf.subtract(3);
  strictEqual(nf.toString(), "0");
});


module("unit:number-formatter:min_max");

test('garbage value initializes to min', function() {
  expect(1);
  var nf = new NumberFormatter("blarf", {min: 5});
  strictEqual(nf.toString(), "5");
});

test('prevents subtracting past min', function(){
  expect(1);
  var nf = new NumberFormatter(8, {min: 5});
  nf.subtract(4);
  strictEqual(nf.toString(), "5");
});

test('prevents adding past max', function(){
  expect(1);
  var nf = new NumberFormatter(3, {max: 5});
  nf.add(6);
  strictEqual(nf.toString(), "5");
});

module("unit:number-formatter:smoke_test");

test("smoke test numeric", function() {
  expect(3);

  var options = {
    step:      0.01,
    precision: 5,
    scale:     2,
    min:       3,
    max:       6
  };

  var nf = new NumberFormatter("foo", options);
  nf.add(0.01);
  nf.add(0.006);
  nf.subtract(0.01);
  strictEqual(nf.toString(), "003.01");
  nf.add(10);
  strictEqual(nf.toString(), "006.00");
  nf.subtract(8);
  strictEqual(nf.toString(), "003.00");
});

test("smoke test strings", function() {
  expect(3);

  var options = {
    step:      0.01,
    precision: 5,
    scale:     2,
    min:       3,
    max:       6
  };

  var nf = new NumberFormatter("foo", options);
  nf.add("0.01");
  nf.add("0.006");
  nf.subtract("0.01");
  strictEqual(nf.toString(), "003.01");
  nf.add("10");
  strictEqual(nf.toString(), "006.00");
  nf.subtract("8");
  strictEqual(nf.toString(), "003.00");
});
