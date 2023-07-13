import { indeedScrapper } from "./scrapper/indeedScrapper"


type commandsOjb = {
    [key:string]: Function
}

function printHelp(){
    console.log("----------------- help ----------------")
}

let helloScrap = new indeedScrapper()

let commands:commandsOjb = {
    q: async function() {console.log("quiting"); return true},
    help: async function (){printHelp()},
    hello: async function (){await helloScrap.scrap()}
}


export {commands}