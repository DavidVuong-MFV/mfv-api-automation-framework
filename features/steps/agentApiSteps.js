const { Given, When,Then } = require('@cucumber/cucumber');
const apiClient = require('../../src/apiClient');
const apiPaths = require('../../src/apiPaths');
const { loadJson } = require('../../support/dataLoader');
const { assertStatus, assertIdentifierAndUuid } = require('../../support/assertions');

Given('I prepare agent payload from {string}', function(fileName) { 
    // loadJson automatically resolves env folder (qa, stag, prod) 
    this.payload = loadJson(fileName);
    // Ensure identifier is unique per test run to avoid 409 Conflict on create
    if (this.payload && typeof this.payload.identifier === 'string') {
      const suffix = `-${Date.now()}`;
      this.payload.identifier = `${this.payload.identifier}${suffix}`;
    }
  });

Given('I set cookie to {string}', function(cookie) {
  // Set scenario-local cookie value which overrides env/config cookie
  this.cookie = cookie;
});

When('I create an agent', async function() {
  const cookieValue = this.cookie || (this.config && this.config.cookie) || process.env.COOKIE || '';
  const headers = cookieValue ? { Cookie: cookieValue } : {};

  this.response = await apiClient.post(
    this.context,
    apiPaths.agents,
    this.payload,
    { headers }
  );
});

Then('the response status is {int}', function (expectedStatus) {
  return assertStatus(this.response, expectedStatus);
}); 

Then('the response body contains the agent identifier and uuid', async function() {
  return assertIdentifierAndUuid(this.response, this.payload && this.payload.identifier);
}); 
