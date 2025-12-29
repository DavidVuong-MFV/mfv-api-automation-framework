const util = require('util');

// Set DEBUG_LOGS=true to enable request/response logging
function shouldLog() {
  return String(process.env.DEBUG_LOGS).toLowerCase() === 'true';
}

function logRequest(method, path, data, options) {
  if (!shouldLog()) return;
  console.log('🔷 API Request:', method, path);
  if (data !== undefined && data !== null) {
    console.log('  Data:', util.inspect(data, { depth: null, colors: true }));
  }
  if (options && Object.keys(options).length > 0) {
    console.log('  Options:', util.inspect(options, { depth: null, colors: true }));
  }
}

async function logResponse(response) {
  if (!shouldLog()) return;
  try {
    const status = typeof response.status === 'function' ? response.status() : response.status;
    const headers = typeof response.headers === 'function' ? response.headers() : (response.headers || {});
    let bodyText;
    try { bodyText = await response.text(); } catch (e) { bodyText = '<unavailable>'; }

    // Cache the raw body text on the response object so later helpers can reuse it without
    // attempting to consume the body stream a second time.
    try { response._bodyText = bodyText; } catch (e) { /* ignore if immutable */ }

    console.log('🔹 API Response:', status);
    console.log('  Headers:', util.inspect(headers, { depth: null, colors: true }));
    console.log('  Body:', bodyText);
  } catch (err) {
    console.error('Error logging response:', err);
  }
}

// Pretty-print or force-log the response body. If DEBUG_LOGS=true this will be a no-op
// (body already logged). The `force` option allows printing regardless of DEBUG_LOGS.
async function logResponseBody(response, label = '', options = {}) {
  const { force = false } = options;
  if (!shouldLog() && !force) return;

  try {
    let text = response._bodyText;
    if (text === undefined) {
      try { text = await response.text(); } catch (e) { text = '<unavailable>'; }
    }

    let parsed;
    try { parsed = JSON.parse(text); } catch (e) { parsed = null; }

    if (label) console.log(`🔸 ${label} - Response body:`);
    if (parsed) {
      console.log(util.inspect(parsed, { depth: null, colors: true }));
    } else {
      console.log(text);
    }
  } catch (err) {
    console.error('Error logging response body:', err);
  }
}

module.exports = {
  logRequest,
  logResponse,
  logResponseBody,
};