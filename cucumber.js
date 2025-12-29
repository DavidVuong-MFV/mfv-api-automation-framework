module.exports = {
  default: {
    require: ['src/**/*.js', 'steps/**/*.js', 'features/steps/**/*.js'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    parallel: 1
  }
};
