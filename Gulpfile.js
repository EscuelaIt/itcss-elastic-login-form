const gulp = require('gulp')
const browserSync = require('browser-sync')
const runSequence = require('run-sequence')

const postcss = require('gulp-postcss')
const cssnext = require('postcss-cssnext')
const partialImport = require('postcss-partial-import')
const mixins = require('postcss-mixins')
const devtools = require('postcss-devtools')

const cssstats = require('gulp-cssstats')

const inputCSS = './web/src/main.css'
const outputCSS = './web/css'
const processors = [
  devtools,
  partialImport,
  mixins,
  cssnext
]

// CSS Task --------------------------------------------------------------------
gulp.task('css', () => {
  return gulp.src(inputCSS)
    .pipe(postcss(processors))
    .pipe(gulp.dest(outputCSS))
    .pipe(browserSync.stream())
})

// Server Task -----------------------------------------------------------------
gulp.task('server', () => {
  browserSync({
    server: {
      baseDir: 'web'
    }
  })
})

// Lint CSS --------------------------------------------------------------------
gulp.task('lint-css', lintCssTask => {
  const gulpStylelint = require('gulp-stylelint')

  return gulp
    .src('web/src/**/*.css')
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
})

// CSS Stats --------------------------------------------------------------------
gulp.task('cssstats', () => {
  gulp.src('./web/css/main.css')
    .pipe(cssstats())
    .pipe(gulp.dest('./cssstats/'));
});


// Build Sequences -------------------------------------------------------------
gulp.task('default', (callback) => {
  runSequence('css', 'server', 'watch',
    callback
  )
})

// Watch Task ------------------------------------------------------------------
gulp.task('watch', () => {
  gulp.watch('web/src/**/*.css', ['watchCSS'])
})

gulp.task('watchCSS', (callback) => {
  runSequence( 'css', callback )
})
