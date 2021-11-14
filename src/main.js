async function parseRatio(options) {
    switch (options.format) {
        case 'jacoco-xml':
            return await parseJacocoXml(options);
        default:
            throw new Error('unknown format: ' + options.format);
    }
}

async function parseJacocoXml(options) {
    var fs = require('fs').promises;
    var xml2js = require('xml2js');

    const data = await fs.readFile(options.file);

    return xml2js.parseStringPromise(data).then(function (result) {
        let ratio = 0;
        let counters = result.report.counter;
        for (var i = 0; i < counters.length; i++) {
            let counter = counters[i].$;
            if (counter.type.toLowerCase() === options.metrics) {
                return counter.covered / (Number(counter.covered) + Number(counter.missed));
            }
        }
    });
}

export async function createBadge(options) {
    let ratio = await parseRatio(options);
    console.log(ratio * 100);
    return true;
}