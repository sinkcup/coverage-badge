import arg from 'arg';
import { createBadge } from './main';

function parseArgumentsIntoOptions() {
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
    template: args['--template'] || `${__dirname}/../res/coverage.svg`,
    file: args._[0],
  };
}

async function cli(args) {
  try {
    const options = parseArgumentsIntoOptions(args);
    await createBadge(options);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

export { cli };
