import { promises as fs } from 'fs';
import xml2js from 'xml2js';
import sharp from 'sharp';

async function parseJacocoXml(options) {
  const data = await fs.readFile(options.file);

  return xml2js.parseStringPromise(data).then((result) => {
    const counters = result.report.counter;
    for (let i = 0; i < counters.length; i += 1) {
      const counter = counters[i].$;
      if (counter.type.toLowerCase() === options.metrics) {
        return counter.covered / (Number(counter.covered) + Number(counter.missed));
      }
    }
    return 0;
  });
}

async function parseClover(options) {
  const data = await fs.readFile(options.file);

  return xml2js.parseStringPromise(data).then((result) => {
    const { coverage } = result;
    const { project } = coverage;
    const metrics = project[0].metrics[0].$;
    return metrics.coveredstatements / metrics.statements;
  });
}

async function parsePercentage(options) {
  let ratio = 0;
  switch (options.format) {
    case 'jacoco-xml':
      ratio = await parseJacocoXml(options);
      break;
    case 'clover':
      ratio = await parseClover(options);
      break;
    default:
      throw new Error(`unknown format: ${options.format}`);
  }
  return Math.floor(ratio * 100);
}

async function createBadge(options, percentage) {
  const template = (await fs.readFile(options.template)).toString();
  const tmp = template.replace(/>\d+%/g, `>${percentage}%`);
  if (options.outputFormat === 'svg') {
    await fs.writeFile(options.output, tmp);
    return true;
  }
  await sharp(Buffer.from(tmp)).png().toFile(options.output);
  return true;
}

export { createBadge, parsePercentage };
