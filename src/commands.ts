import { indeedScrapper } from "./scrapper/indeedScrapper"
import * as fs from "fs"
import * as crypto from "crypto"
import { poleemploiScrapper } from "./scrapper/poleemploiScrapper"

let skillset:string[] = ["nodejs", "node.js", "html", "css", "python", "react", "sql"]

type commandsOjb = {
    [key:string]: Function
}

function printHelp(){
    console.log("----------------- help ----------------")
    for ( let command of Object.keys(commands)){
        console.log(command)
    }
}

let helloScrap = new indeedScrapper()
let polemp = new poleemploiScrapper()

let commands:commandsOjb = {
    help: async function (curr:object){printHelp(); return curr },
    hello: async function (curr:object){await helloScrap.scrap(); return curr},
    // svelte sors sans raison
    pole: async function (curr:object){ curr = await polemp.scrap(skillset); return curr},
    out: async function(curr:object){
        console.log("out")
        let now = new Date().getTime() 
        let hasher = crypto.createHash("sha256").update(now.toString()).digest("hex")  
        fs.writeFile(hasher + ".txt", JSON.stringify(curr), (err) => {
            if(err) console.log(err)
        })
        curr = {}
        return curr
    },
    random: async (curr:object) => {
        curr = {random: crypto.randomBytes(6).toString("hex")}
        return curr
    },
    scrap:async (curr:object) => {
       curr = await helloScrap.scrap() 
       return curr
    },
    print: async(curr:object) => {
        console.log(JSON.stringify(curr))
        return curr
    }, 

}


export {commands}