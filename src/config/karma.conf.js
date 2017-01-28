module.exports = function (config) {
  config.set({
    basePath: '../scripts/',
    frameworks: [
      'browserify',
      'mocha',
    ],
    files: [
      '**/*.js',
    ],
    exclude: [
    ],
    preprocessors: {
      '**/*.js': [ 'browserify' ],
    },
    browserify: {
      debug: true,
      transform: [ 'babelify' ],
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  });
};
