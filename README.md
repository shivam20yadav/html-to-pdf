# converter-html-to-pdf

Convert an HTML string to a PDF using headless Chromium (via [Puppeteer](https://pptr.dev/)).
Works with any template engine (EJS, Handlebars, ...) that returns an HTML string.

Requires Node.js >= 22.12. Installing downloads Chromium (~170 MB).

## Install

```
npm install converter-html-to-pdf
```

## Usage

```js
const fs = require('fs');
const pdfGen = require('converter-html-to-pdf');

async function main() {
    const html = `
        <html>
            <body>
                <h3>Hello world</h3>
            </body>
        </html>`;

    const pdf = await pdfGen.generatePdf(html); // Buffer
    fs.writeFileSync('temp.pdf', pdf);
}

main();
```

`new pdfGen().generatePdf(...)` (the v1 style) still works too.

## API

```
generatePdf(html, options?, extra?) => Promise<Buffer>
```

### `options`

Any [Puppeteer PDF option](https://pptr.dev/api/puppeteer.pdfoptions). They are merged over these defaults:

```js
{
    format: 'A4',
    printBackground: true,
    margin: { top: 20, bottom: 20, left: 20, right: 20 }
}
```

Commonly used: `format`, `landscape`, `margin`, `printBackground`, `displayHeaderFooter` (with `headerTemplate` / `footerTemplate`), `pageRanges`, `scale`, `width`, `height`, `preferCSSPageSize`, `timeout`.

```js
await pdfGen.generatePdf(html, {
    format: 'A4',
    displayHeaderFooter: true,
    headerTemplate: '<div style="font-size:10px">My header</div>',
    footerTemplate: '<div style="font-size:10px">Page <span class="pageNumber"></span> / <span class="totalPages"></span></div>',
    margin: { top: 100, bottom: 100 }
});
```

### `extra`

| Property        | Description                                                                              |
|-----------------|------------------------------------------------------------------------------------------|
| `browser`       | Reuse a running Puppeteer browser (much faster for many PDFs). You must close it yourself. |
| `launchOptions` | Extra options for `puppeteer.launch`. Default `args` are `--no-sandbox --disable-setuid-sandbox`; pass your own `args` to replace them. |
| `javaScript`    | Set `false` to disable JavaScript while rendering (recommended for untrusted HTML).      |

Reusing a browser:

```js
const puppeteer = require('puppeteer');
const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
const pdf = await pdfGen.generatePdf(html, {}, { browser });
await browser.close();
```

## Docker / Linux

Chromium usually refuses to start as root without `--no-sandbox`, so it is on by default. If you run as a non-root user with a working sandbox, pass `launchOptions: { args: [] }` for a safer setup. You will also need Chromium's system libraries (see the [Puppeteer troubleshooting guide](https://pptr.dev/troubleshooting)).

## Security

The HTML is rendered by a real browser. If it comes from untrusted users, set `javaScript: false` and be aware it can still request remote URLs (images, iframes, CSS).

## Changes in 2.0.0

- Fixed: launch flags were never applied (`options` instead of `args`).
- Fixed: the browser was leaked when rendering failed.
- Removed `--disable-web-security`.
- Options are merged over the defaults instead of replacing them.
- `printBackground` is now on by default, header/footer is off by default.
- Waits for network to be idle before printing.
- Updated Puppeteer 19 -> 25 (needs Node >= 22.12). Added TypeScript typings.

## License

ISC
