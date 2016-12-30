// generated on 2016-05-16 using generator-gulp-webapp 1.1.1
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var browserSync = require('browser-sync');
var del = require('del');
var wiredep = require('wiredep').stream;
var open = require('open');
var fontSpider = require( 'gulp-font-spider' );
var nodemon = require('gulp-nodemon');

var $ = gulpLoadPlugins();               //Automatically load any gulp plugins in your package.json
var reload = browserSync.reload;

gulp.task('styles', function () {
  return gulp.src('app/Public/css/*.css')
    .pipe($.plumber())                      //plumber():Prevent pipe breaking caused by errors from gulp plugins
    .pipe($.sourcemaps.init())
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/Public/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('scripts', function () {
  return gulp.src('app/Public/js/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/Public/scripts'))
    .pipe(reload({stream: true}));
});

function lint(files, options) {           //检查js语法错误
  return function () {
    return gulp.src(files)
      .pipe(reload({stream: true, once: true}))
      .pipe($.eslint(options))
      .pipe($.eslint.format())
      .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
  };
}
var testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', lint('app/Public/js/*.js'));
gulp.task('lint:test', lint('test/spec/**/*.js', testLintOptions));

gulp.task('html', ['styles', 'scripts'], function () {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
  return gulp.src('app/Public/img/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    }))
      .on('error', function (err) {
        console.log(err);
        this.end();
      })))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('fonts', function () {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function (err) {})
    .concat('app/Public/fonts/**/*'))
    .pipe(gulp.dest('.tmp/Public/fonts'));
  //.pipe(gulp.dest('dist/fonts'));
});

gulp.task('extras', function () {
  return gulp.src([
    'app/*.*',
    'app/Public/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['styles', 'fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'app/*.html',
    '.tmp/Public/js/*.js',
    'app/Public/img/*',
    '.tmp/Public/fonts/*'
  ]).on('change', reload);

  gulp.watch('app/Public/css/*.css', ['styles']);
  gulp.watch('app/Public/js/*.js', ['scripts']);
  gulp.watch('app/Public/fonts/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('node_start', function () {
  nodemon({
    script: 'app/Public/node_upload/index.js'
    , ext: 'js html'
    , env: { 'NODE_ENV': 'development' }
  })
    .on('start', function() {
      browserSync({
        notify: false,
        port: 9000,
        server: {
          baseDir: ['.tmp', 'app'],
          routes: {
            '/bower_components': 'bower_components'
          }
        }
      });
  });

});

/*// 代理
gulp.task('browser-sync', function() {
  browserSync.init({
    proxy: "http://127.0.0.1:8080/webpack-dev-server/"
  });
});*/

gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['dist']
    }
  });
});

gulp.task('serve:test', ['scripts'], function () {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': '.tmp/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch('app/Public/js/*.js', ['scripts']);
  gulp.watch('test/spec/**/*.js').on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', function () {
  gulp.src('app/Public/css/*.css')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/Public/css'));

  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('build', ['html', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean', 'styles', 'scripts', 'fonts'], function () {
  console.log('default');
});


gulp.task('fontspider', function() {
  return gulp.src('app/Public/h5_show/show.html')
    .pipe(fontSpider({
      backup: true
    }));
});
