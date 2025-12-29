const fs = require('fs');
const path = require('path');
const config = require('../config/config');

function loadJson(filename) {
  const fullPath = path.join(config.dataDir, filename);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Data file not found: ${fullPath}`);
  }
  return JSON.parse(fs.readFileSync(fullPath, 'utf8'));
}

function listFiles(pattern = '*.json') {
  // simple listing; for complex patterns use glob
  return fs.readdirSync(config.dataDir).filter(f => f.endsWith('.json'));
}

module.exports = { loadJson, listFiles };
