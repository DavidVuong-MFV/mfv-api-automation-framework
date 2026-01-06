const { logRequest, logResponse, logResponseBody } = require('../../support/loggers');
const apiPaths = require('./apiPaths');

// Lightweight wrapper around Playwright APIRequestContext (CommonJS exports)
const post = async (context, path, data, options = {}) => {
  logRequest('POST', path, data, options);
  const response = await context.post(path, { data, ...options });
  await logResponse(response);

  // For agent creation we always print the response body (force) to aid debugging
  try {
    if (path === apiPaths.agents) {
      await logResponseBody(response, 'Agent create response', { force: true });
    }
  } catch (e) {
    console.error('Error logging agent response body:', e);
  }

  return response;
};

const get = async (context, path, options = {}) => {
  logRequest('GET', path, null, options);
  const response = await context.get(path, options);
  await logResponse(response);
  return response;
};

const put = async (context, path, data, options = {}) => {
  logRequest('PUT', path, data, options);
  const response = await context.put(path, { data, ...options });
  await logResponse(response);
  return response;
};

const remove = async (context, path, options = {}) => {
  logRequest('DELETE', path, null, options);
  const response = await context.delete(path, options);
  await logResponse(response);
  return response;
};

module.exports = {
  post,
  get,
  put,
  remove,
};
