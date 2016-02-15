import gulp from 'gulp';
import concat from 'gulp-concat';
import { config }  from 'package.json';
import reload from 'gulp-livereload';
import sass from 'gulp-sass';

gulp.task('styles', 'Transiles and bundles Sass', function() {
  return gulp.src(config.paths.styles)
    .pipe(sass())
    .pipe(concat('site.css'))
    .pipe(gulp.dest(config.paths.output));
});
