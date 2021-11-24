import fs from 'fs/promises';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from '../src/cli';

test('parse default args', async () => {
  const argv = [
    '--format',
    'jacoco-xml',
    'tests/data/jacocoTestReport.xml',
  ];

  const options = await parseArgs(argv);
  expect(options.format).toBe('jacoco-xml');
  expect(options.file).toBe('tests/data/jacocoTestReport.xml');
  expect(options.metrics).toBe('line');
  expect(options.output).toBe('coverage.png');
  expect(options.outputFormat).toBe('png');
  expect(options.template).toBe(await fs.realpath(`${dirname(fileURLToPath(import.meta.url))}/../res/coverage.svg`));
});

test('parse all args', async () => {
  const argv = [
    '--format',
    'clover',
    'tests/data/clover.xml',
    '--output',
    'coverage.svg',
    '--output-format',
    'svg',
    '--template',
    '/tmp/coverage.svg',
  ];

  const options = await parseArgs(argv);
  expect(options.format).toBe('clover');
  expect(options.file).toBe('tests/data/clover.xml');
  expect(options.metrics).toBe('line');
  expect(options.output).toBe('coverage.svg');
  expect(options.outputFormat).toBe('svg');
  expect(options.template).toBe('/tmp/coverage.svg');
});

test('parse output-format svg', async () => {
  const argv = [
    '--format',
    'clover',
    'tests/data/clover.xml',
    '--output-format',
    'svg',
  ];

  const options = await parseArgs(argv);
  expect(options.output).toBe('coverage.svg');
  expect(options.outputFormat).toBe('svg');
});
