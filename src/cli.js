import arg from 'arg';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createBadge, parsePercentage } from './main';

async function parseArgumentsIntoOptions() {
  const args = arg(
    {
      '--format': String,
      '--metrics': String,
      '--output': String,
      '--output-format': String,
      '--template': String,
      '-f': '--format',
      '-m': '--metrics',
      '-o': '--output',
      '-t': '--template',
    },
  );
  if (!args['--format']) throw new Error('missing required argument: --format');
  return {
    format: args['--format'],
    metrics: args['--metrics'] || 'line',
    output: args['--output'] || 'coverage.png',
    outputFormat: args['--output-format'] || 'png',
    template: args['--template'] || `${dirname(fileURLToPath(import.meta.url))}/../res/coverage.svg`,
    file: args._[0],
  };
}

/* eslint-disable no-console */
async function cli(args) {
  try {
    const options = await parseArgumentsIntoOptions(args);

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

export default cli;
