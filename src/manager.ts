import * as fs from "fs"
import { indeedScrapper } from "./scrapper/indeedScrapper"
import { commands } from "./commands"

type commandsOjb = {
    [key:string]: Function
}

export default async function manager(command:string){
   let indeedScrap = new indeedScrapper()
   
   if (Object.keys(commands).includes(command)){
        return await commands[command]()

   } else {
    console.log("commande non definie")
    return false
   }
  


}


