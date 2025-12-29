# BDD API Automation Framework with Playwright

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables in `.env` file

3. Run tests:
   ```bash
   # Run all tests
   npm test

   # Run with specific tags
   npm run test:tags "@smoke"

   # Run in parallel
   npm run test:parallel

   # Generate HTML report
   npm run report
   ```

## CI secrets & GitHub Actions 🔐

The GitHub Actions CI requires repository **Secrets** for the target API base URLs. These secrets are referenced by the workflow matrix and must be set in **Settings → Secrets → Actions**:

- `API_BASE_QA` — Base URL for the QA environment
- `API_BASE_STAG` — Base URL for the Staging environment

How it works:
- The CI matrix sets `NODE_ENV` to `qa` or `stag` and picks the corresponding secret `API_BASE_<ENV>` at runtime.
- The workflow will fail early with a clear message if the expected secret is not configured.

Set secrets from the CLI (GitHub CLI example):

```bash
# macOS / Linux - requires gh CLI authenticated
gh secret set API_BASE_QA --body "https://api-qa.example.com"
gh secret set API_BASE_STAG --body "https://api-stag.example.com"
```

Local testing tips:
- You can set `NODE_ENV` and `API_BASE` locally to target a specific environment:

```bash
export NODE_ENV=qa
export API_BASE=https://api-qa.example.com
npm test
```

This ensures parity between local runs and CI behavior.

## Slack notifications
The CI workflow can post job results to Slack.

- Create an Incoming Webhook in Slack and copy the webhook URL
- Add the webhook URL to GitHub Secrets:
  - `SLACK_WEBHOOK` — Incoming webhook URL

```bash
gh secret set SLACK_WEBHOOK --body "https://hooks.slack.com/services/XXX/YYY/ZZZ"
```

Notes:
- The workflow posts a concise message for each matrix job including environment and a link to the run.
- Prefer the bot-token option for better governance and rotation. If you want, I can help create the Slack App and test the integration (you must add the secret yourself in GitHub).