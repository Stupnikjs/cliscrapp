import * as fs from "fs"
import { indeedScrapper } from "./scrapper/indeedScrapper"



export default async function manager(command:string){
   let list = ["q", "hello", "list"] 
   if (command === "list") {
    for (let item of list){
        console.log(item + "\n")
    }
    return false 
   }
   if (command === "hello"){
    let indeedScrap = new indeedScrapper()
    await indeedScrap.scrap()
    return false
   }
   
    if(command === "q"){
        return true
    }
    else {
        console.log("commande non definie")
        return false
    }


}


