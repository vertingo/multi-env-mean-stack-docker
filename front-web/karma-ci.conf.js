// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

//process.env.CHROME_BIN = '/usr/bin/google-chrome'

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

//process.env.CHROME_BIN = '/usr/bin/google-chrome'

// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

//process.env.CHROME_BIN = '/usr/bin/google-chrome'


module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
      require('karma-junit-reporter'),
      require('karma-coverage'),
      require('karma-jenkins-reporter')
    ],
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      reports: [ 'html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    // changes type to `cobertura`
    coverageReporter: {
        type: 'cobertura',
        dir: 'target/coverage-reports/'
    },
    // saves report at `target/surefire-reports/TEST-*.xml` because Jenkins
    // looks for this location and file prefix by default.
    junitReporter: {
        outputDir: 'target/surefire-reports/TESTS-TestSuite.xml'
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    browsers: ['ChromeHeadless'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
     }
    },
    logLevel: config.LOG_ERROR,
    autoWatch: false,
    singleRun: true,
    browserNoActivityTimeout: 40000,
    concurrency: Infinity,
  });
};