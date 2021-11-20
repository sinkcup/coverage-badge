const fs = require('fs').promises;
const xml2js = require('xml2js');
const sharp = require('sharp');

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
  });
}

async function parseRatio(options) {
  switch (options.format) {
    case 'jacoco-xml':
      return parseJacocoXml(options);
    default:
      throw new Error(`unknown format: ${options.format}`);
  }
}

async function createBadge(options) {
  const ratio = await parseRatio(options);
  const percentage = Math.floor(ratio * 100);
  if (options.outputFormat === 'text') {
    console.log(`${percentage}%`);
    return true;
  }

  const template = (await fs.readFile(options.template)).toString();
  const tmp = template.replace(/>\d+%/g, `>${percentage}%`);
  if (options.outputFormat === 'svg') {
    await fs.writeFile(options.output, tmp);
    return true;
  }
  await sharp(Buffer.from(tmp)).png().toFile(options.output);
  return true;
}

export { createBadge };
