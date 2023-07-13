"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poleemploiScrapper = void 0;
const puppeteer_1 = require("puppeteer");
class poleemploiScrapper {
    async getText(page, selector) {
        let el = await page.$(selector);
        return await (el === null || el === void 0 ? void 0 : el.evaluate(e => e.textContent));
    }
    async scrap() {
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        let page = await browser.newPage();
        // page 1 
        let url = "https://candidat.pole-emploi.fr/offres/recherche?motsCles=developpeur&offresPartenaires=true&rayon=10&tri=0";
        await page.goto(url);
        const components = await page.$$('["data-id-offre"]');
        console.log(components);
        /*const lastPageNumber = await page.$('');
        
        const elements = await lastPageNumber?.$$("li")

        // nombre de page total
        const last = await elements![elements?.length! - 2].evaluate(el => el.textContent)
 
        type jobType = {
            [key:string]: number
        }
        const jobs:jobType = {}

        
        await browser.close()

        return jobs
        */
    }
}
exports.poleemploiScrapper = poleemploiScrapper;
