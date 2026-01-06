const util = require('util');

function _getStatus(response) {
  return typeof response.status === 'function' ? response.status() : response.status;
}

async function _parseJsonBody(response) {
  if (!response) throw new Error('Response is undefined');

  // If a logger or other helper already cached the raw text, reuse it to avoid
  // consuming the body stream multiple times.
  if (response._bodyText !== undefined) {
    try {
      return JSON.parse(response._bodyText);
    } catch (err) {
      throw new Error('Response body is not valid JSON');
    }
  }

  // Otherwise, try to parse via Playwright's response.json(), falling back to
  // manual text parse for better error messages.
  try {
    const parsed = await response.json();
    if (!parsed || typeof parsed !== 'object') throw new Error('Response body is not a JSON object');
    return parsed;
  } catch (err) {
    // try text parse
    let text;
    try { text = await response.text(); } catch (e) { throw new Error('Response body is not a JSON object'); }
    try { return JSON.parse(text); } catch (e) { throw new Error('Response body is not a JSON object'); }
  }
}

function assertStatus(response, expectedStatus) {
  if (!response) throw new Error('Response is undefined');
  const actual = _getStatus(response);
  if (actual !== expectedStatus) {
    let bodyText = '';
    try {
      // Try to extract body text 
      if (response._bodyText !== undefined && response._bodyText !== null) { 
        bodyText = response._bodyText.toString(); 
      } 
      else 
        if (typeof response.text === 'function') { 
          bodyText = response.text(); // if response has a text() method 
      } 
    } 
    catch (e) { 
      bodyText = '[Unable to read response body]'; 
    }
    throw new Error( `Expected status ${expectedStatus} but got ${actual}\n--- Response body ---\n${bodyText}` );
  }
}

async function assertResponseBodyContainErrorMessage(response, expectedMessage) {
  const body = await _parseJsonBody(response);
  if (!('message' in body)) {
    throw new Error('Response body missing `message` field');
  }
  if (body.message !== expectedMessage) {
    throw new Error(`Expected error message "${expectedMessage}" but got "${body.message}"`);
  }
}
async function assertIdentifierAndUuid(response, expectedIdentifier) {
  const body = await _parseJsonBody(response);

  if (!('identifier' in body)) throw new Error('Response body missing `identifier`');
  if (expectedIdentifier !== undefined && body.identifier !== expectedIdentifier) {
    throw new Error(`Expected identifier ${expectedIdentifier} but got ${body.identifier}`);
  }

  if (!('uuid' in body)) throw new Error('Response body missing `uuid`');
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(body.uuid)) throw new Error(`Invalid uuid format: ${body.uuid}`);
}

module.exports = {
  assertStatus,
  assertIdentifierAndUuid,
  assertResponseBodyContainErrorMessage,};