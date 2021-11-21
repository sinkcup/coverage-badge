import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { parseRatio } from '../src/main';

test('parse jacoco xml line coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'line',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parseRatio(options);
  expect(result).toBe(0.6);
});
