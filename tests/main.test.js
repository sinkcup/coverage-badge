import os from 'os';
import faker from 'faker';
import fs from 'fs/promises';
import hasha from 'hasha';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { createBadge, parsePercentage } from '../src/main';

test('parse jacoco xml line coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'line',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(60);
});

test('parse jacoco xml method coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'method',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(75);
});

test('parse jacoco xml class coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'class',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(100);
});

test('parse jacoco xml instruction coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'instruction',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(61);
});

test('parse jacoco xml complexity coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'complexity',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(75);
});

test('parse jacoco xml unsupported coverage', async () => {
  const options = {
    format: 'jacoco-xml',
    metrics: 'foo',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/jacocoTestReport.xml`,
  };
  try {
    await parsePercentage(options);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe("unsupported metric 'foo'");
  }
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

test('parse clover method coverage', async () => {
  const options = {
    format: 'clover',
    metrics: 'method',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/clover.xml`,
  };
  const result = await parsePercentage(options);
  expect(result).toBe(50);
});

test('parse clover class coverage', async () => {
  const options = {
    format: 'clover',
    metrics: 'class',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/clover.xml`,
  };
  try {
    await parsePercentage(options);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe("unsupported metric 'class'");
  }
});

test('parse unknown format', async () => {
  const options = {
    format: 'foo',
    file: `${dirname(fileURLToPath(import.meta.url))}/data/clover.xml`,
  };
  try {
    await parsePercentage(options);
  } catch (e) {
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe("unknown format 'foo'");
  }
});

test('create badge png', async () => {
  const output = `${os.tmpdir()}/${faker.system.fileName()}.png`;
  const options = {
    output,
    outputFormat: 'png',
    template: `${dirname(fileURLToPath(import.meta.url))}/../res/coverage.svg`,
  };
  await createBadge(options, 75);
  expect(await fs.stat(output)).toBeTruthy();
});

test('create badge svg', async () => {
  const output = `${os.tmpdir()}/${faker.system.fileName()}.svg`;
  const options = {
    output,
    outputFormat: 'svg',
    template: await fs.realpath(`${dirname(fileURLToPath(import.meta.url))}/../res/coverage.svg`),
  };
  await createBadge(options, 75);
  const sha256 = await hasha.fromFile(output, { algorithm: 'sha256' });
  expect(sha256).toBe('f70961fc021eb941364030dbd15045dc2a9f25b6e5e0018b9d491d96e7600bfc');
});
