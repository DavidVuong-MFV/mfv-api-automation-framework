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