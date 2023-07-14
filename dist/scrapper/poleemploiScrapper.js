"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.poleemploiScrapper = void 0;
const puppeteer_1 = require("puppeteer");
class poleemploiScrapper {
    async getText(page, selector) {
        let el = await page.$(selector);
        return await (el === null || el === void 0 ? void 0 : el.evaluate(e => e.textContent));
    }
    async scrap(technos) {
        var _a, _b, _c;
        let result = [];
        const browser = await puppeteer_1.default.launch({ headless: "new" });
        let page = await browser.newPage();
        // page 1 
        let url = "https://candidat.pole-emploi.fr/offres/recherche?motsCles=developpeur&offresPartenaires=true&rayon=10&tri=0";
        await page.goto(url);
        const components = await page.$$('[data-id-offre]');
        for (let comp of components) {
            let annonceId = await comp.evaluate(el => el.getAttribute("data-id-offre"));
            let page = await browser.newPage();
            let link = `https://candidat.pole-emploi.fr/offres/recherche/detail/${annonceId}`;
            await page.goto(link);
            let text_description = await this.getText(page, ".description");
            let compObj = {};
            for (let tech of technos) {
                if ((_a = text_description === null || text_description === void 0 ? void 0 : text_description.toLowerCase()) === null || _a === void 0 ? void 0 : _a.includes(tech.toLowerCase())) {
                    console.log((_b = text_description === null || text_description === void 0 ? void 0 : text_description.toLowerCase()) === null || _b === void 0 ? void 0 : _b.includes(tech.toLowerCase()), tech);
                    if (!compObj.techs) {
                        compObj.link = link;
                        compObj.techs = [tech];
                    }
                    else
                        (_c = compObj.techs) === null || _c === void 0 ? void 0 : _c.push(tech);
                }
            }
            // filtre les matchs avec moin d'un tiers des competences requises 
            if (compObj.link && compObj.techs && compObj.techs.length > (technos.length / 3))
                result.push(compObj);
        }
        await browser.close();
        return result;
    }
}
exports.poleemploiScrapper = poleemploiScrapper;
