const config = require('./config/config');

const makeHeaders = () => {
  const headers = { 'Content-Type': 'application/json' };
  const cookie = (config.cookie || '').toString().trim();
  if (cookie) {
    if (cookie.includes('=')) {
      headers['Cookie'] = cookie;
    } else {
      // If COOKIE is present but malformed, warn and ignore it to avoid sending invalid headers
      console.warn('Invalid COOKIE value in config: expected "name=value" format. Ignoring COOKIE.');
    }
  }
  return headers;
};

module.exports = {
  use: {
    baseURL: config.urlBase,
    extraHTTPHeaders: makeHeaders(),
    timeout: config.timeout
  }
};
