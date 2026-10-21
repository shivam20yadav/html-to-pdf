import type { Browser, LaunchOptions, PDFOptions } from 'puppeteer';

export interface GeneratePdfExtra {
    /** Reuse a running browser. It is not closed for you. */
    browser?: Browser;
    /** Extra options for puppeteer.launch (ignored when `browser` is given). */
    launchOptions?: LaunchOptions;
    /** Set false to disable JavaScript while rendering untrusted HTML. Default true. */
    javaScript?: boolean;
}

export function generatePdf(html: string, options?: PDFOptions, extra?: GeneratePdfExtra): Promise<Buffer>;

declare class PdfGenerator {
    static generatePdf: typeof generatePdf;
    generatePdf: typeof generatePdf;
}

export default PdfGenerator;
