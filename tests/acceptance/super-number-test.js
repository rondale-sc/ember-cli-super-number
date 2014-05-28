import startApp from "ember-super-number/tests/helpers/start-app";

var App;

module('acceptance:super-number', {
  setup: function() { App = startApp(); },
  teardown: function() { Ember.run(App, App.destroy); }
});


test('increment button increments by 1 when clicked', function() {
  expect(1);

  visit("/");
  click('#standard .increment');

  andThen(function() {
    equal(find("#standard input").val(), "1");
  });
});

test('decrement button decrements by 1 when clicked', function() {
  expect(1);

  visit("/");
  click('#standard .decrement');

  andThen(function() {
    equal(find("#standard input").val(), "-1");
  });
});

test('treat blank input as 0', function() {
  expect(1);

  visit("/");
  fillIn("#standard input", "");
  click('#standard .increment');

  andThen(function(){ equal(find("#standard input").val(), "1"); });
});

test('convert non-numeric input gracefully to 0', function(){
  expect(1);

  visit("/");
  fillIn("#standard input", "Alfred Molina");
  click('#standard .increment');

  andThen(function(){ equal(find("#standard input").val(), "1"); });
});

module('acceptance:keyboard_support', {
  setup: function() { App = startApp(); },
  teardown: function() { Ember.run(App, App.destroy); }
});

test('down arrow should decrement', function(){
  expect(1);

  visit("/");
  var DOWN_ARROW = 40;
  var e = $.Event( "keydown", { which: DOWN_ARROW } );
  $('#standard input').trigger(e);

  andThen(function() { equal(find("#standard input").val(), "-1"); });
});

test('up arrow should increment', function(){
  expect(1);

  visit("/");
  var UP_ARROW = 38;
  var e = $.Event( "keydown", { which: UP_ARROW } );
  $('#standard input').trigger(e);

  andThen(function() { equal(find("#standard input").val(), "1"); });
});

module('acceptance:options', {
  setup: function() { App = startApp(); },
  teardown: function() { Ember.run(App, App.destroy); }
});

test('specify minimum value', function(){
  expect(1);

  visit("/");
  fillIn("#min input", "2");
  click('#min .decrement');
  click('#min .decrement');
  andThen(function() { equal(find("#min input").val(), "1"); });
});

test('specify maximum value', function(){
  expect(1);

  visit("/");
  fillIn("#max input", "0");
  click('#max .increment');
  click('#max .increment');
  andThen(function() { equal(find("#max input").val(), "1"); });
});
