import gulp from 'gulp';
import { config }  from 'package.json';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';

gulp.task('build:browserify', 'Bundle code.', ['lint'], () => {
  return browserify({
      entries: config.paths.main,
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('site.js'))
    .pipe(gulp.dest(config.paths.output));
});
