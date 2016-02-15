import gulp from 'gulp';
import gutil from 'gulp-util';

gulp.task('build', 'Bulid the site', ['clean'], () => {
  return gulp.start(['copy', 'build:templates', 'build:browserify', 'styles']);
});
