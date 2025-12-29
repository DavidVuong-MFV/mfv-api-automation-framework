const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const searchDirs = ['src', 'support']; // avoid requiring feature step files that register Cucumber steps

// helper to decide whether a file should be checked (skip cucumber support/step files)
function shouldCheckFile(filePath, content) {
  const cucumberMarkers = ["@cucumber/cucumber", "Given(", "When(", "Then(", "Before(", "After(", "BeforeAll(", "AfterAll("];
  for (const m of cucumberMarkers) {
    if (content.indexOf(m) !== -1) return false;
  }
  return true;
}

function walk(dir) {
  const res = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      res.push(...walk(p));
    } else if (ent.isFile() && p.endsWith('.js')) {
      res.push(p);
    }
  }
  return res;
}

let failed = false;
const files = new Set();
for (const d of searchDirs) {
  const full = path.resolve(d);
  if (!fs.existsSync(full)) continue;
  walk(full).forEach(f => files.add(path.resolve(f)));
}

console.log(`Checking ${files.size} JS files for syntax/runtime load errors...`);
for (const f of files) {
  try {
    const content = fs.readFileSync(f, 'utf8');
    if (!shouldCheckFile(f, content)) {
      console.log(`Skipping Cucumber-support file: ${f}`);
      continue;
    }

    execFileSync(process.execPath, ['-e', `require(${JSON.stringify(f)})`], { stdio: 'pipe' });
  } catch (err) {
    failed = true;
    console.error(`\nFailed to require: ${f}\nExit/Output:\n${err.stdout ? err.stdout.toString() : ''}\n${err.stderr ? err.stderr.toString() : ''}`);
  }
}
if (failed) {
  console.error('\nRequire check failed. Fix the above errors before pushing.');
  process.exit(1);
}
console.log('All files required successfully.');
