var gulp = require('gulp');
var GulpEste = require('gulp-este');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var yargs = require('yargs');
var args = yargs.alias('p', 'production').argv;
var este = new GulpEste(__dirname, args.production, '../../../..');

var replace = require('gulp-replace');
var minifyHTML = require('gulp-minify-html');
var bg = require('gulp-bg');

var paths = {
  stylus: ['app/client/css/app.styl'],
  coffee: [
    'bower_components/este-library/este/**/*.coffee',
    'app/**/*.coffee'
  ],
  jsx: ['app/**/*.jsx'],
  js: [
    'bower_components/closure-library/**/*.js',
    'bower_components/este-library/este/**/*.js',
    'bower_components/este-library/este/**/*.js~',
    'app/**/*.js',
    'app/**/*.js~',
    'tmp/**/*.js',
    '!**/build/**'
  ],
  unittest: ['app/**/*_test.js'],
  compiler: 'bower_components/closure-compiler/compiler.jar',
  externs: [
    'app/client/js/externs.js',
    'bower_components/react-externs/externs.js'
  ],
  concatAll: {
    development: [
      'bower_components/react/react-with-addons.js'
    ],
    production: [
      'bower_components/react/react-with-addons.min.js'
    ]
  }
};

var jsGenerationProps = {
  rename : function(path) {
    path.extname = '.js~';
  }
}

var dirs = {
  googBaseJs: 'bower_components/closure-library/closure/goog',
  watch: ['app']
};

gulp.task('clean', function() {
  rimraf('app/client/build', {}, function(cb){});
  rimraf('app/client/dist', {}, function(cb){});
});

gulp.task('stylus', function() {
    return este.stylus(paths.stylus);
});

gulp.task('coffee', function() {
  return este.coffee(paths.coffee, jsGenerationProps);
});

gulp.task('jsx', function() {
  return este.jsx(paths.jsx, jsGenerationProps);
});

gulp.task('transpile', function(done) {
  return runSequence('stylus', 'coffee', 'jsx', done);
});

gulp.task('deps', function() {
  return este.deps(paths.js);
});

gulp.task('unittest', function() {
  return este.unitTest(dirs.googBaseJs, paths.unittest);
});

gulp.task('dicontainer', function() {
  return este.diContainer(dirs.googBaseJs, [
    {
      name: 'app.DiContainer',
      resolve: ['App']
    }
  ]);
});

gulp.task('concat-deps', function() {
  return este.concatDeps();
});

gulp.task('compile-clientapp', function() {
  return este.compile(paths.js, 'app/client/build', {
    compilerPath: paths.compiler,
    compilerFlags: {
      closure_entry_point: 'app.main',
      externs: paths.externs
    }
  });
});

gulp.task('concat-all', function() {
  return este.concatAll({
    'app/client/build/app.js': paths.concatAll
  });
});

gulp.task('livereload-notify', function() {
  return este.liveReloadNotify();
});

gulp.task('js', function(done) {
  return runSequence.apply(
    null, [
      este.shouldCreateDeps() ? 'deps' : void 0,
      'unittest',
      'dicontainer',
      'concat-deps',
      args.production ? 'compile-clientapp' : void 0,
      'concat-all',
      este.shouldNotify() ? 'livereload-notify' : void 0,
      done
    ].filter(function(task) {
      return task;
    })
  );
});

gulp.task('build', function(done) {
  return runSequence('transpile', 'js', done);
});

gulp.task('livereload-server', function() {
  return este.liveReloadServer();
});

gulp.task('watch', function() {
  return este.watch(dirs.watch, {
    coffee: 'coffee',
    css: 'livereload-notify',
    js: 'js',
    jsx: 'jsx',
    styl: 'stylus'
  }, function(task) {
    return gulp.start(task);
  });
});

gulp.task('server', este.bg('node', ['server']));

gulp.task('run', function(done) {
  return runSequence.apply(null,
    [
      !args.production ? 'livereload-server' : void 0,
      'watch',
      'server',
      done
    ].filter(function(task) {
      return task;
    })
  );
});

gulp.task('default', function(done) {
  return runSequence('build', 'run', function() {
    done();
    return console.log('Point your browser to http://localhost:8000');
  });
});

gulp.task('bump', function(done) {
  return este.bump('./*.json', yargs, done);
});

gulp.task('dist', ['build'], function(done) {
  gulp.src('app/client/build/app.js').pipe(gulp.dest('app/client/dist/js'));
  gulp.src('app/client/build/app.css').pipe(gulp.dest('app/client/dist/css'));

  gulp.src('index.html')
    .pipe(replace(
      /<!--\s*build:js(?:\(([^\)]+?)\))?\s+(\/?([^\s]+?))?\s*-->[\s\S]*<!--\s*endbuild\s*-->/gim,
      '<script src="./js/app.js"></script>'
    ))
    .pipe(replace(
      /<!--\s*build:css(?:\(([^\)]+?)\))?\s+(\/?([^\s]+?))?\s*-->[\s\S]*<!--\s*endbuild\s*-->/gim,
      '<link rel="stylesheet" href="./css/app.css">'))
    .pipe(minifyHTML())
    .pipe(gulp.dest('app/client/dist/'));

  return
});

gulp.task("run-dist", bg('node', '--harmony', 'server.js', 'dist'));
