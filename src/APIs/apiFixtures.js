const { BeforeAll, Before } = require('@cucumber/cucumber');
const { request } = require('@playwright/test');
const config = require('../../config/config');
const { loadJson } = require('../../support/dataLoader');

let apiContext;

BeforeAll(async () => {
  apiContext = await request.newContext({
    baseURL: config.urlBase,
    timeout: config.timeout,
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Cookie': config.cookie || ''
    }
  });
});

Before(function (scenario) {
  this.context = apiContext;
  this.config = config;
  // load default test payloads for scenario if needed
  // e.g., this.testData = loadJson('login_valid.json');
});
