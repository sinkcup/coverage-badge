import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parsePercentage } from '../src/main';

test('parse jacoco xml line coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'line',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(60);
});

test('parse clover line coverage', async () => {
  const options = {
    format: 'clover',
    metrics: 'line',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/clover.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(64);
});
