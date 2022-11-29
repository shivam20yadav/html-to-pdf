const puppeteer = require('puppeteer');

async function generatePdf(html_code, options){ 
    const browser = await puppeteer.launch({
        options:[
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-web-security'
        ]
    });
    const page = await browser.newPage();
    await page.setContent(html_code, {});
    return Promise.resolve(page.pdf(options)).then(async function(data) {
       await browser.close();
       return data;
    });
}