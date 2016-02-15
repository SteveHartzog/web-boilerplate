var path = require('path');
var appPath = require('app-module-path');

// Add base paths to avoid having to do relative lookups
appPath.addPath(path.join(__dirname, 'tasks'));
appPath.addPath(__dirname);

// Setup gulp help
require('gulp-help')(require('gulp'), {
  hideDepsMessage: true
});

// Add the babel require hook for ES6 support
require('babel-register');

var requireDir = require('require-directory');

// Setup require exclusions
function exclude(path) {
  switch (true) {
  case /tasks\/pipes/.test(path):
  case /tasks\/utils/.test(path):
    return true;
  default:
    return false;
  }
}

// Require all tasks
requireDir(module, './tasks', { exclude: exclude });