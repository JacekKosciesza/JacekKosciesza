'use strict';

const chalk = require('chalk');
const fs = require('fs');

if (process.argv.length < 3) {
  console.log('File not provided');
  process.exit(1);
}

try {
  const path = process.argv[2];
  const data = fs.readFileSync(path);
  const aggregations = JSON.parse(data).aggregations;
  const pwa = aggregations.find(a => a.name === 'Progressive Web App');
  const avg = pwa.score.reduce((last, s) => {
    return last + s.overall;
  }, 0) / pwa.score.length;

  console.log(chalk.red(`Score: ${avg}`));

  if (avg < 0.1) {
    console.log(JSON.stringify(pwa, null, 2));
    process.exit(1);
  }

  process.exit(0);
} catch (e) {
  console.log(e);
  process.exit(1);
}