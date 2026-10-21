const puppeteer = require('puppeteer');

const DEFAULT_PDF_OPTIONS = {
    format: 'A4',
    printBackground: true, // keep CSS backgrounds/colors
    margin: { top: 20, bottom: 20, left: 20, right: 20 }
};

// --no-sandbox is needed when running as root / in Docker, drop it via launchOptions.args if you don't need it
const DEFAULT_LAUNCH_ARGS = ['--no-sandbox', '--disable-setuid-sandbox'];

/**
 * @param {string} html HTML string to render
 * @param {import('puppeteer').PDFOptions} [options] puppeteer pdf options, merged over the defaults
 * @param {object} [extra]
 * @param {import('puppeteer').Browser} [extra.browser] reuse a running browser (it is NOT closed for you)
 * @param {import('puppeteer').LaunchOptions} [extra.launchOptions] extra puppeteer.launch options
 * @param {boolean} [extra.javaScript=true] set false to disable JS when rendering untrusted HTML
 * @returns {Promise<Buffer>}
 */
async function generatePdf(html, options, extra = {}) {
    const { browser: sharedBrowser, launchOptions = {}, javaScript = true } = extra;
    const browser = sharedBrowser || await puppeteer.launch({
        args: DEFAULT_LAUNCH_ARGS,
        ...launchOptions
    });
    try {
        const page = await browser.newPage();
        try {
            await page.setJavaScriptEnabled(javaScript);
            await page.setContent(html, { waitUntil: 'networkidle0' });
            return Buffer.from(await page.pdf({ ...DEFAULT_PDF_OPTIONS, ...options }));
        } finally {
            await page.close();
        }
    } finally {
        if (!sharedBrowser) await browser.close();
    }
}

// backwards compat: v1 exported a class, `new PdfGen().generatePdf(...)` keeps working
function PdfGenerator() {}
PdfGenerator.prototype.generatePdf = generatePdf;
PdfGenerator.generatePdf = generatePdf;

module.exports = PdfGenerator;
