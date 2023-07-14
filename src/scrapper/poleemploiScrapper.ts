import puppeteer, {Page, Browser} from "puppeteer"

type compObjType = {
    link?:string,
    techs?: string[]
}

export class poleemploiScrapper {

    async getText(page:Page, selector:string){
        let el = await page.$(selector)
        return await el?.evaluate( e => e.textContent) 
    }

    async scrap(technos:string[]){

        let result:compObjType[] = []
        const browser = await puppeteer.launch({headless:"new"})
        let page = await browser.newPage(); 

        // page 1 

        let url = "https://candidat.pole-emploi.fr/offres/recherche?motsCles=developpeur&offresPartenaires=true&rayon=10&tri=0"
        await page.goto(url)

        const components = await page.$$('[data-id-offre]')
        
        for (let comp of components){
            let annonceId = await comp.evaluate(el => el.getAttribute("data-id-offre"))

            let page = await browser.newPage();
            let link = `https://candidat.pole-emploi.fr/offres/recherche/detail/${annonceId}`
            await page.goto(link)

            let text_description = await this.getText(page, ".description")
            let compObj:compObjType = {}

            for (let tech of technos){ 
            
             if (text_description?.toLowerCase()?.includes(tech.toLowerCase())){
                console.log(text_description?.toLowerCase()?.includes(tech.toLowerCase()), tech) 
                if(!compObj.techs){
                    compObj.link =  link; 
                    compObj.techs = [tech]
                } 
                else compObj.techs?.push(tech)

               } 

             } 
             
            // filtre les matchs avec moin d'un tiers des competences requises 
            if (compObj.link && compObj.techs && compObj.techs.length > (technos.length / 3)) result.push(compObj)
                
            }
           
            
           await browser.close()
           return result
        
        }        

        

        
        
    }
