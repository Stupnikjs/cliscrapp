import puppeteer, {Page, Browser} from "puppeteer"


export class poleemploiScrapper {

    async getText(page:Page, selector:string){
        let el = await page.$(selector)
        return await el?.evaluate( e => e.textContent) 
    }

    async scrap(){

        const browser = await puppeteer.launch({headless:"new"})

        let page = await browser.newPage(); 

        // page 1 

        let url = "https://candidat.pole-emploi.fr/offres/recherche?motsCles=developpeur&offresPartenaires=true&rayon=10&tri=0"
        await page.goto(url)

        const components = await page.$$('["data-id-offre"]')
        console.log(components) 
        
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