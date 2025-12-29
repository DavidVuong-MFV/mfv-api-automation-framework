const { logRequest, logResponse } = require('../support/loggers');

// Lightweight wrapper around Playwright APIRequestContext (CommonJS exports)
const post = async (context, path, data, options = {}) => {
  logRequest('POST', path, data, options);
  const response = await context.post(path, { data, ...options });
  await logResponse(response);
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
