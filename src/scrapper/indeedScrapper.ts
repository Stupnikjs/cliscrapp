import puppeteer, { ElementHandle,Page } from "puppeteer";

export class indeedScrapper {

    async getText(page:Page, selector:string){
        let el = await page.$(selector)
        return await el?.evaluate( e => e.textContent) 
    }
    async scrap(){

        const browser = await puppeteer.launch({headless:"new"})
        let page = await browser.newPage(); 

        // page 1 

        await page.goto("https://www.hellowork.com/fr-fr/emploi/recherche.html?k=developpeur+&k_autocomplete=&l=&l_autocomplete=#37621632")

        const components = await page.$$('[data-component]') 
        const lastPageNumber = await page.$('[data-cypress-p]  ul');
        
        const elements = await lastPageNumber?.$$("li")
        // nombre de page total 
        const last = await elements![elements?.length! - 2].evaluate(el => el.textContent)
 
      
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
       
        for (let i = 0 ; i < parseInt(last!); i++){

        }
      
        await browser.close()
    }




}