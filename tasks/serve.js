import gulp from 'gulp';
import { config }  from 'package.json';
import runSequence from 'run-sequence';
import http from 'http';
import reload from 'gulp-livereload';
import batch from 'gulp-batch';
import st from 'st';
import path from 'path';

gulp.task('serve', 'Run the development server', ['setup-server'], () => {
  reload.listen();
  gulp.watch(config.paths.source + '*.html', () => {
    runSequence('copy', 'force-reload');
  });  
  gulp.watch(config.paths.styles, () => {
    runSequence('styles', 'force-reload');
  });
  gulp.watch(config.paths.code, () => {
    runSequence('build:browserify', 'force-reload');
  });
  gulp.watch([config.paths.views, config.paths.partials], () => {
    runSequence('build:templates', 'force-reload');
  });
});

gulp.task('force-reload', () => {
  reload.reload();
})

gulp.task('setup-server', false, ['build'], done => {
  http.createServer(
    st({ path: path.join(process.cwd(), 'dist'), index: 'index.html', cache: false })
  ).listen(8080, done);
});

gulp.task('serve-old', done => {
  http.createServer(
    st({ path: path.join(process.cwd(), 'OldSite/app'), index: 'index.html', cache: false })
  ).listen(8081, done);
});
