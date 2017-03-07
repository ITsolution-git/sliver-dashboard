/**
 * Use:
 *  gulp [task]
 *
 * Task:
 *  defaul      run build and watch
 *  build       clean tmp and compilate application with template cache
 *  watch       watch for file changes in src dir and run build task
 *  clean       clear temp dir
 *  vendor      build vendor.css and vendor.js from bower components
 *  serve       web server
 *
 */

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    angularFilesort = require('gulp-angular-filesort'),
    templateCache = require('gulp-angular-templatecache'),
    minifyHTML = require('gulp-minify-html'),
    sourcemaps = require('gulp-sourcemaps'),
    rimraf = require('rimraf'),
    less = require('gulp-less'),
    filter = require('gulp-filter'),
    minifyCSS = require('gulp-minify-css'),
    mainBowerFiles = require('main-bower-files'),
    eslint = require('gulp-eslint'),
    webserver = require('gulp-webserver');

var path = {
    tmp: 'tmp',
    public: 'public',
    src: {
        vendor: 'vendor',
        bowerJson: 'bower.json',
        js: 'src/app',
        css: 'src/style'
    },
    dest: {
        js: 'public/js',
        css: 'public/css',
        fonts: 'public/fonts'
    }
};


gulp.task('default', ['build'], function () {
    return gulp.start('watch');
});

gulp.task('vendor', ['vendor:js', 'vendor:css', 'vendor:fonts']);

gulp.task('vendor:js', function () {
    var vendors = mainBowerFiles({
        includeDev: true,
        paths: {
            bowerJson: path.src.bowerJson,
            bowerDirectory: path.src.vendor
        }
    });

    return gulp.src(vendors)
        .pipe(filter('**/*.js'))
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('vendor:css', function () {
    var vendors = mainBowerFiles({
        includeDev: true,
        paths: {
            bowerJson: path.src.bowerJson,
            bowerDirectory: path.src.vendor
        }
    });

    return gulp.src(vendors)
        .pipe(filter('**/*.css'))
        .pipe(concat('vendor.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest(path.dest.css));
});

// Fonts
gulp.task('vendor:fonts', function () {
    return gulp
        .src([
            'vendor/bootstrap/fonts/glyphicons-halflings-regular.*',
            'vendor/font-awesome/fonts/fontawesome-webfont.*',
            'vendor/open-sans-fontface/fonts/**/*'
        ])
        .pipe(gulp.dest(path.dest.fonts));
});

gulp.task('build', ['app', 'css']);

gulp.task('app', ['html', 'js'], function () {
    return gulp
        .src([
            path.tmp + '/templateСache.js',
            path.tmp + '/app.js',
            'app.local.js'
        ])
        //.pipe(sourcemaps.init())
        //.pipe(uglify())
        //.pipe(sourcemaps.write())
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(path.dest.js));
});

gulp.task('js', function () {
    return gulp.src(path.src.js + '/**/*.js')
        .pipe(ngAnnotate())
        .pipe(angularFilesort())
        .pipe(concat('app.js'))
        .pipe(gulp.dest(path.tmp));
});

gulp.task('html', function () {
    return gulp.src(path.src.js + '/**/*.html')
        .pipe(minifyHTML({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(templateCache('templateСache.js', {standalone: true}))
        .pipe(gulp.dest(path.tmp));
});

gulp.task('css', function () {
    return gulp.src(path.src.css + '/style.less')
        .pipe(less())
        .pipe(gulp.dest(path.dest.css));
});

gulp.task('serve', function () {
    gulp.src(path.public)
        .pipe(webserver({
            // port:8000,
            livereload: true,
            // directoryListing: true,
            open: true
        }));
});

// clean tmp
gulp.task('clean', function (cb) {
    rimraf(path.tmp, cb);
});

// watch files
gulp.task('watch', function () {
    watch([path.src.js + '/**/*.js', path.src.js + '/**/*.html'], function (event, cb) {
        gulp.start('app');
    });

    watch([path.src.css + '/**/*.less'], function (event, cb) {
        gulp.start('css');
    });
});

gulp.task('lint', function () {
    return gulp.src(path.src.js + '/**/*.js')
        .pipe(eslint({
            extends: 'eslint:recommended',
            ecmaFeatures: {
                'modules': true
            },
            rules: {
                'strict': 2
            },
            globals: {
                'angular': true,
                'jQuery': false,
                '$': true
            },
            envs: [
                'browser'
            ]

        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});