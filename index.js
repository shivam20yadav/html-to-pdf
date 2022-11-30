const puppeteer = require('puppeteer');

class generatePdfClass{
    async generatePdf(html_code, options){
        if(options === undefined || options === null){
            options = {
                format: 'A4', // page size
                displayHeaderFooter: true,
                margin: {
                    top: 100, //set margin at top for header
                    bottom: 100 // set margin at bottom for footer
                }
            }
        }  
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
}
module.exports = generatePdfClass;
