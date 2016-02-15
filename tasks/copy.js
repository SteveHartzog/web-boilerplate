import gulp from 'gulp';
import { config }  from 'package.json';
import path from 'path';

gulp.task('copy', 'Copies html to the output folder', ['copy:images'], () => {
     
  return gulp.src(config.paths.source + 'index.html')
    .pipe(gulp.dest(config.paths.output));
    
});

gulp.task('copy:images', 'Copies the images to the output folder', () => {
  
  return gulp.src(config.paths.images)
    .pipe(gulp.dest(path.join(config.paths.output, 'images')));
  
});
