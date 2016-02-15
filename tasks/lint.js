import gulp from 'gulp';
import { config }  from 'package.json';
import eslint from 'gulp-eslint';
import { argv } from 'yargs';

gulp.task('lint', 'Lints JavaScript with eslint', () => {
  let fix = argv.fix || false;

  return gulp.src(config.paths.code)
    .pipe(eslint({ config: '.eslintrc' }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());

}, {
  options: {
    'fix': 'Automatically fix some errors'
  }
});
