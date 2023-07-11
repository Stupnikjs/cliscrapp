import puppeteer, { ElementHandle,Page,Browser } from "puppeteer";
import * as fs from "fs"


export class indeedScrapper {

    async getText(page:Page, selector:string){
        let el = await page.$(selector)
        return await el?.evaluate( e => e.textContent) 
    }
    async scrap(){

        const browser = await puppeteer.launch({headless:"new"})
        const arr = await this.getPopularSkills()


        let page = await browser.newPage(); 

        // page 1 

        await page.goto("https://www.hellowork.com/fr-fr/emploi/recherche.html?k=developpeur+&k_autocomplete=&l=&l_autocomplete=#37621632")

        const components = await page.$$('[data-component]') 
        const lastPageNumber = await page.$('[data-cypress-p]  ul');
        
        const elements = await lastPageNumber?.$$("li")

        // nombre de page total 
        const last = await elements![elements?.length! - 2].evaluate(el => el.textContent)
 
        type jobType = {
            [key:string]: number
        }
        const jobs:jobType = {}
        
        
        for (let component of components){
           
            let line = await this.getJobDesciption(browser, component)

            for (let item of arr){
                if (line?.includes(item) && jobs[item] ) jobs[item] += 1
                if (line?.includes(item) && !jobs[item]) jobs[item] = 1
            }
        }
        
        
        // autre pages 
       
        for (let i = 2 ; i < parseInt(last!); i++){
            let page = await browser.newPage()
            await page.goto(`https://www.hellowork.com/fr-fr/emploi/recherche.html?k=developpeur+&p=${i}&mode=pagination`)
            const components = await page.$$('[data-component]')
            for (let component of components){
           
                let line = await this.getJobDesciption(browser, component)
    
                for (let item of arr){
                    if (line?.includes(item) && jobs[item] ) jobs[item] += 1
                    if (line?.includes(item) && !jobs[item]) jobs[item] = 1
                }
            }

        }
        console.log(jobs)
        await browser.close()
    }


    async getJobDesciption(browser:Browser, component:ElementHandle){
            let page = await browser.newPage()
            const linkid = await component?.evaluate(el => el.getAttribute("data-offerid"))
            // recupere le lien 
    
            let lien = `https://www.hellowork.com/fr-fr/emplois/${linkid}.html`
            
            await page.goto(lien)
    
            const line = await this.getText(page, 'section[data-job-description]')
            return line 
    }


    async getPopularSkills(){
        let buf = fs.readFileSync("popularlib.json")

        return JSON.parse(buf.toString()).popular

    }




}