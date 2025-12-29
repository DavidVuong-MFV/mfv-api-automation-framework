const reporter = require('cucumber-html-reporter');
const fs = require('fs');

const jsonFile = 'reports/cucumber-report.json';
const outputFile = 'reports/cucumber-report.html';

if (!fs.existsSync(jsonFile)) {
  console.error(`Report JSON not found: ${jsonFile}. Run tests first (npm test).`);
  process.exit(1);
}

const options = {
  theme: 'bootstrap',
  jsonFile,
  output: outputFile,
  reportSuiteAsScenarios: true,
  launchReport: false,
  metadata: {
    "App Version": "1.0.0",
    "Test Environment": process.env.NODE_ENV || 'qa',
    "Platform": process.platform,
    "Generated": new Date().toISOString()
  }
};

reporter.generate(options);
console.log(`Generated report: ${outputFile}`);
