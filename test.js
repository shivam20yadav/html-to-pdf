const assert = require('assert');
const PdfGen = require('./index');

const html = '<html><body style="background:#eee"><h3>Hello world</h3></body></html>';

(async () => {
    // static call, defaults
    const a = await PdfGen.generatePdf(html);
    assert.strictEqual(a.slice(0, 4).toString(), '%PDF');

    // v1 style instance call, options merged over defaults
    const b = await new PdfGen().generatePdf(html, { landscape: true });
    assert.strictEqual(b.slice(0, 4).toString(), '%PDF');

    // JS disabled path
    const c = await PdfGen.generatePdf(html, null, { javaScript: false });
    assert.strictEqual(c.slice(0, 4).toString(), '%PDF');

    console.log('ok');
})().catch((e) => { console.error(e); process.exit(1); });
