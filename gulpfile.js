var gulp = require('gulp');
var tslint = require('gulp-tslint');
var jasmine = require('gulp-jasmine');
var gulp = require('gulp-help')(gulp);
var tsconfig = require('gulp-tsconfig-files');
var runSequence = require('run-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('./tsconfig.json');
var rimraf = require('rimraf');
var istanbul = require('gulp-istanbul');
var coveralls = require('gulp-coveralls');
var remapIstanbul = require('remap-istanbul/lib/gulpRemapIstanbul');
var sourcemaps = require('gulp-sourcemaps');
var open = require('gulp-open');

var openCoverage = !!process.argv.find(a => a === '--coverage');

gulp.task('tslint', 'Lints all TypeScript source files', function () {
  return gulp.src(['./src/**/*.ts', './test/**/*.ts'])
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('test', 'Runs the Jasmine test specs', function () {
  return runSequence(
    'tslint',
    ['test-build-src', 'test-build-test'],
    'run-test',
    ['coveralls', 'remap-istanbul']);
});

gulp.task('coveralls', function() {
  return gulp.src('./coverage/**/lcov.info')
    .pipe(coveralls());
});

gulp.task('test-local-src', function() {
  return runSequence('test-build-src', 'run-test', 'remap-istanbul');
});

gulp.task('test-local-test', function() {
  return runSequence('test-build-test', 'run-test', 'remap-istanbul');
});

gulp.task('run-test', ['istanbul'], function() {
  return gulp.src('./.test/**/*.js')
    .pipe(jasmine())
    .pipe(istanbul.writeReports())
    // .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('istanbul', function() {
  return gulp.src(['./.test/src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('remap-istanbul', function () {
  if (openCoverage) {
    gulp.src('./coverage/html-report/index.html')
      .pipe(open());
    openCoverage = false;
  }
  return gulp.src('./coverage/coverage-final.json')
      .pipe(remapIstanbul({
          reports: {
              'html': './coverage/html-report'
          },
      }));
});

gulp.task('test-build', function() {
  return runSequence(['test-build-src', 'test-build-test']);
});

gulp.task('test-build-src', function() {
  rimraf.sync('./.test/src');
  return gulp.src('./src/**/*.ts')
    .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./.test/src'));
});

gulp.task('test-build-test', function() {
  rimraf.sync('./.test/test');
  return gulp.src(['./test/**/*.ts', '!./test/**/*.d.ts'])
    .pipe(ts())
    .pipe(gulp.dest('./.test/test'));
});

gulp.task('test-clean', function() {
  return rimraf.sync('./.test');
});

gulp.task('watch', 'Watches ts source files and runs build on change', ['test-build-src', 'test-build-test'], function () {
  gulp.watch('./src/**/*.ts', ['tslint', 'test-local-src']);
  gulp.watch('./test/**/*.ts', ['tslint', 'test-local-test']);
});
