import gulp from 'gulp';
import { config }  from 'package.json';
import del from 'del';
import vinylPaths from 'vinyl-paths';

gulp.task('clean', 'Deletes all files in the output path', function() {
  return gulp.src(config.paths.output)
    .pipe(vinylPaths(del));
});
