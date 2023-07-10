"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indeedScrapper = void 0;
const puppeteer_1 = require("puppeteer");
class indeedScrapper {
    async getText(page, selector) {
        let el = await page.$(selector);
        return await (el === null || el === void 0 ? void 0 : el.evaluate(e => e.textContent));
    }
    async scrap() {
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        let page = await browser.newPage();
        // page 1 
        await page.goto("https://www.hellowork.com/fr-fr/emploi/recherche.html?k=developpeur+&k_autocomplete=&l=&l_autocomplete=#37621632");
        const components = await page.$$('[data-component]');
        const lastPageNumber = await page.$('[data-cypress-p]  ul');
        const elements = await (lastPageNumber === null || lastPageNumber === void 0 ? void 0 : lastPageNumber.$$("li"));
        const last = await elements[(elements === null || elements === void 0 ? void 0 : elements.length) - 2].evaluate(el => el.textContent);
        console.log(last);
        /*
        const jobs = []

        console.log(await this.getText(page,'[data-cypress-p] > ul > li:last-child' ))
        for (let component of components){
            let page = await browser.newPage()
            const linkid = await component?.evaluate(el => el.getAttribute("data-offerid"))
            // recupere le lien
    
            let lien = `https://www.hellowork.com/fr-fr/emplois/${linkid}.html`
            
            await page.goto(lien)
    
            const line = await this.getText(page, 'section[data-job-description]')
            jobs.push(line)


        }
        console.log(jobs)
        
        // autre pages
        /*
        for (let i = 0 ; i < pageTotal; i++){

        }
        */
        await browser.close();
    }
}
exports.indeedScrapper = indeedScrapper;
