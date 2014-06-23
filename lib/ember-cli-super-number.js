'use strict';

var path = require('path');
var fs   = require('fs');

function EmberCLISuperNumber(project) {
  this.project = project;
  this.name    = 'Ember CLI Super Number';
}

function unwatchedTree(dir) {
  return {
    read:    function() { return dir; },
    cleanup: function() { }
  };
}

EmberCLISuperNumber.prototype.treeFor = function treeFor(name) {
  var treePath =  path.join('node_modules', 'ember-cli-super-number', name);

  if (fs.existsSync(treePath)) {
    return unwatchedTree(treePath);
  }
};

EmberCLISuperNumber.prototype.included = function included(app) {
  this.app = app;

  this.app.import('vendor/ember-cli-super-number/styles/style.css');
};

module.exports = EmberCLISuperNumber;
