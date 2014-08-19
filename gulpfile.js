var gulp         = require('gulp');
var rename       = require('gulp-rename');
var gutil        = require('gulp-util');
var es           = require('event-stream');
var escape       = require('js-string-escape');

var blocklyCssStringify = function(file, callback){
  var lines = String(file.contents).split('\n');

  var css = lines.reduce(function(collection, line){
    collection.push('    "' + escape(line) + '"');
    return collection;
  }, []);

  var result = [
    "(function(){",
    "  goog.require('goog.cssom');",
    "  goog.require('Blockly.Css');",
    "",
    "  var cssContent = [",
    css.join(',\n'),
    "  ].join('\\n');",
    "",
    "  Blockly.Css.inject = function(){",
    "    goog.cssom.addCssText(cssContent);",
    "  };",
    "})();"
  ];

  file.contents = new Buffer(result.join('\n'));

  return callback(null, file);
};

gulp.task('css', function(){
  gulp.src('./main.css')
  .pipe(es.map(blocklyCssStringify))
  .pipe(rename({
    basename: 'css',
    extname: '.js'
  }))
  .on('error', gutil.log)
  .pipe(gulp.dest('./'));
});

gulp.task('watch', function(){
  gulp.watch('./main.css', ['css'])
});