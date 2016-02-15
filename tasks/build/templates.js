import gulp from 'gulp';
import { config }  from 'package.json';
import wrap from 'gulp-wrap';
import handlebars from 'gulp-handlebars';
import declare from 'gulp-declare';
import path from 'path';
import concat from 'gulp-concat';
import gutil from 'gulp-util';
import merge from 'merge-stream';

gulp.task('build:templates', 'Pre-compile templates', () => {
  
  var templates = 
    gulp.src(config.paths.views)
      .pipe(handlebars())
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
        namespace: 'Handlebars.templates',
        noRedeclare: true // Avoid duplicate declarations
      }))
      .pipe(concat('templates.js'));
      
  var partials =
    gulp.src(config.paths.partials)
      .pipe(handlebars())
      .pipe(wrap('Handlebars.registerPartial(<%= processPartialName(file.relative) %>, Handlebars.template(<%= contents %>));', {}, {
        imports: {
          processPartialName: function(fileName) {
            // Strip the extension and the underscore
            // Escape the output with JSON.stringify
            return JSON.stringify(path.basename(fileName, '.js').substr(1));
          }
        }
      }))
      .pipe(concat('partials.js'));

  return merge(partials, templates)
  .pipe(concat('templates.js'))
  .pipe(gulp.dest(config.paths.output));
});
