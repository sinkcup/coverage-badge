import yargs from 'yargs';
import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createBadge, parsePercentage } from './main';

async function parseArgs(argv) {
  const options = yargs(argv)
    .usage('Usage: $0 [OPTION]... FILE')
    .option('format', {
      alias: 'f',
      description: 'input format',
      demandOption: true,
    })
    .option('metrics', {
      alias: 'm',
      description: 'line, method or class',
      default: 'line',
    })
    .option('output', {
      alias: 'o',
      description: 'output filename',
      default: 'coverage.png',
    })
    .option('output-format', {
      description: 'text, svg or png',
      default: 'png',
    })
    .option('template', {
      alias: 't',
      description: 'svg template filename',
      default: await fs.realpath(`${dirname(fileURLToPath(import.meta.url))}/../res/coverage.svg`),
    })
    .parse();
  const file = options._[0];
  options.file = file;
  return options;
}

/* eslint-disable no-console */
async function cli() {
  try {
    const argv = process.argv.slice(2);
    const options = await parseArgs(argv);

    const percentage = await parsePercentage(options);
    if (options.outputFormat === 'text') {
      console.log(`${percentage}%`);
      return true;
    }
    await createBadge(options, percentage);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  return 0;
}

export { cli, parseArgs };
