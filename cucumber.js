module.exports = {
  default: {
    requireModule: ['@babel/register'],
    require: ['src/**/*.js', 'features/steps/**/*.js'],
    format: ['progress', 'json:reports/cucumber-report.json'],
    paths: ['features/**/*.feature'],
    parallel: 1
  }
};
