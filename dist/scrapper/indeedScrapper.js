"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.indeedScrapper = void 0;
const puppeteer_1 = require("puppeteer");
const fs = require("fs");
class indeedScrapper {
    async getText(page, selector) {
        let el = await page.$(selector);
        return await (el === null || el === void 0 ? void 0 : el.evaluate(e => e.textContent));
    }
    async scrap() {
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        const arr = await this.getPopularSkills();
        let page = await browser.newPage();
        // page 1 
        await page.goto("https://www.hellowork.com/fr-fr/emploi/recherche.html?k=developpeur+&k_autocomplete=&l=&l_autocomplete=#37621632");
        const components = await page.$$('[data-component]');
        const lastPageNumber = await page.$('[data-cypress-p]  ul');
        const elements = await (lastPageNumber === null || lastPageNumber === void 0 ? void 0 : lastPageNumber.$$("li"));
        // nombre de page total 
        const last = await elements[(elements === null || elements === void 0 ? void 0 : elements.length) - 2].evaluate(el => el.textContent);
        const jobs = {};
        for (let component of components) {
            let line = await this.getJobDesciption(browser, component);
            for (let item of arr) {
                if ((line === null || line === void 0 ? void 0 : line.includes(item)) && jobs[item])
                    jobs[item] += 1;
                if ((line === null || line === void 0 ? void 0 : line.includes(item)) && !jobs[item])
                    jobs[item] = 1;
            }
        }
        // autre pages 
        // parseInt(last!)
        for (let i = 2; i < 5; i++) {
            let page = await browser.newPage();
            await page.goto(`https://www.hellowork.com/fr-fr/emploi/recherche.html?k=developpeur+&p=${i}&mode=pagination`);
            const components = await page.$$('[data-component]');
            for (let component of components) {
                let line = await this.getJobDesciption(browser, component);
                for (let item of arr) {
                    if ((line === null || line === void 0 ? void 0 : line.includes(item)) && jobs[item])
                        jobs[item] += 1;
                    if ((line === null || line === void 0 ? void 0 : line.includes(item)) && !jobs[item])
                        jobs[item] = 1;
                }
            }
        }
        console.log(jobs);
        await browser.close();
    }
    async getJobDesciption(browser, component) {
        let page = await browser.newPage();
        const linkid = await (component === null || component === void 0 ? void 0 : component.evaluate(el => el.getAttribute("data-offerid")));
        // recupere le lien 
        let lien = `https://www.hellowork.com/fr-fr/emplois/${linkid}.html`;
        await page.goto(lien);
        const line = await this.getText(page, 'section[data-job-description]');
        return line;
    }
    async getPopularSkills() {
        let buf = fs.readFileSync("popularlib.json");
        return JSON.parse(buf.toString()).popular;
    }
}
exports.indeedScrapper = indeedScrapper;
