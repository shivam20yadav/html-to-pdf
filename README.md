# html-to-pdf

## Package Description

This package can be use for convert HTML code to PDF.

#

## How to use

```
const pdfGen = require('html-to-pdf');
const fs = require('fs);
async function Gen(){
    let HTML = `
        <html>
            <body>
                <h3>Hello world</h3>
            </body>
        <html>

    let option = {
        format: 'A4', // page size
        displayHeaderFooter: true,
        margin: {
            top: 100, //set margin at top for header
            bottom: 100 // set margin at bottom for footer
        }
    }
    fs.writeFileSync("temp.pdf",await pdfGen(HTML,option));
}
Gen()

`

```

This is a sample code for create PDF using html. We can use ejs or any tamplate that return as string html for dynamically create PDF using html code.

Here I used very basic option for creating pdf and if you dont provide any option it will use inbuilt option but if you want to to add any option I will drop a link for all option avalible for lib.

| Property             | Modifiers       | Type                                                                                                                                                                                                                                                                            | Description                                                        | Default |
|----------------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|---------|
| displayHeaderFooter? | boolean         | (Optional) Whether to show the header and footer.                                                                                                                                                                                                                               | false                                                              |
| footerTemplate?      | string          | (Optional) HTML template for the print footer. Has the same constraints and support for special classes as PDFOptions.headerTemplate.                                                                                                                                           |
| format?              | PaperFormat     | (Optional)                                                                                                                                                                                                                                                                      | letter.                                                            |
| headerTemplate?      | string          | (Optional) HTML template for the print header. Should be valid HTML with the following classes used to inject values into them:- date formatted print date- title document title- url document location- pageNumber current page number- totalPages total pages in the document |
| height?              | string | number | (Optional) Sets the height of paper. You can pass in a number or a string with a unit.                                                                                                                                                                                          |
| landscape?           | boolean         | (Optional) Whether to print in landscape orientation.                                                                                                                                                                                                                           | = false                                                            |
| margin?              | PDFMargin       | (Optional) Set the PDF margins.                                                                                                                                                                                                                                                 | no margins are set.                                                |
| omitBackground?      | boolean         | (Optional) Hides default white background and allows generating pdfs with transparency.                                                                                                                                                                                         | false                                                              |
| pageRanges?          | string          | (Optional) Paper ranges to print, e.g. 1-5, 8, 11-13.                                                                                                                                                                                                                           | The empty string, which means all pages are printed.               |
| path?                | string          | (Optional) The path to save the file to.                                                                                                                                                                                                                                        | the empty string, which means the PDF will not be written to disk. |
| preferCSSPageSize?   | boolean         | (Optional) Give any CSS @page size declared in the page priority over what is declared in the width or height or format option.                                                                                                                                                 | false, which will scale the content to fit the paper size.         |
| printBackground?     | boolean         | (Optional) Set to true to print background graphics.                                                                                                                                                                                                                            | false                                                              |
| scale?               | number          | (Optional) Scales the rendering of the web page. Amount must be between 0.1 and 2.                                                                                                                                                                                              | 1                                                                  |
| timeout?             | number          | (Optional) Timeout in milliseconds                                                                                                                                                                                                                                              | 30000                                                              |
| width?               | string | number | (Optional) Sets the width of paper. You can pass in a number or a string with a unit.                                                                                                                                                                                           |



https://pptr.dev/api/puppeteer.pdfoptions/

Please check this link for more option 
