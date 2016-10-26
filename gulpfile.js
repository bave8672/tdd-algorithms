var gulp = require('gulp');
var tslint = require('gulp-tslint');
var jasmine = require('gulp-jasmine');
var gulp = require('gulp-help')(gulp);
var tsconfig = require('gulp-tsconfig-files');
var gulpSequence = require('gulp-sequence');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var rimraf = require('rimraf');
var istanbul = require('gulp-istanbul');

gulp.task('tslint', 'Lints all TypeScript source files', function () {
  return gulp.src(['./src/**/*.ts', './test/**/*.ts'])
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('test', 'Runs the Jasmine test specs', ['pre-test'], function () {
    return gulp.src('./.test/**/*.js')
      .pipe(jasmine())
      .pipe(istanbul.writeReports())
      .pipe(istanbul.enforceThresholds({ thresholds: { global: 90 } }));
});

gulp.task('pre-test', ['test-build-src', 'test-build-test'], function() {
  gulp.src(['./.test/src/**/*.js'])
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test-build-src', ['test-clean'], function() {
  return gulp.src('./src/**/*.ts')
    .pipe(ts(tsProject))
    .pipe(gulp.dest('./.test/src'));
});

gulp.task('test-build-test', ['test-clean'], function() {
  return gulp.src(['./test/**/*.ts', '!./test/**/*.d.ts'])
    .pipe(ts({target: 'es5'}))
    .pipe(gulp.dest('./.test/test'));
});

gulp.task('test-clean', function() {
  return rimraf.sync('./.test');
})

gulp.task('watch', 'Watches ts source files and runs build on change', function () {
  gulp.watch('./src/**/*.ts', ['tslint', 'test']);
  gulp.watch('./test/**/*.ts', ['tslint', 'test']);
});
