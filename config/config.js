const path = require('path');
const dotenv = require('dotenv');

// Decide which env file to load
// Priority: ENV_FILE > NODE_ENV > default 'qa'
const envName = process.env.NODE_ENV || 'qa';
const envFile = process.env.ENV_FILE || path.resolve(process.cwd(), 'env', `.env.${envName}`);

// Load the chosen .env file
dotenv.config({ path: envFile });

const config = {
  env: envName,
  apiBase: process.env.API_BASE,
  timeout: Number(process.env.TIMEOUT_MS || 30000),
  dataDir: path.resolve(process.cwd(), 'data', envName),
  // Optional cookie header value to include in API requests
  cookie: process.env.COOKIE || ''
};

module.exports = config;
