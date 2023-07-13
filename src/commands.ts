import { indeedScrapper } from "./scrapper/indeedScrapper"
import * as fs from "fs"
import * as crypto from "crypto"


type commandsOjb = {
    [key:string]: Function
}

function printHelp(){
    console.log("----------------- help ----------------")
}

let helloScrap = new indeedScrapper()

let commands:commandsOjb = {
    help: async function (curr:object){printHelp(); return curr },
    hello: async function (curr:object){await helloScrap.scrap(); return curr},
    out: async function(curr:object){
        console.log("out")
        let now = new Date().getTime()
        console.log(now)
        
        let hasher = crypto.createHash("sha256").update(now.toString()).digest("hex")  
        fs.writeFile(hasher + ".txt", JSON.stringify(curr), (err) => {
            if(err) console.log(err)
        })
        curr = {}
        return curr
    },
    test:async (curr:object) => {
        console.log("test")
        curr = {michel: "montaigne"}
        return curr
    },
    random: async (curr:object) => {
        curr = {random: crypto.randomBytes(6).toString("hex")}
        return curr
    },
    print: async(curr:object) => {
        console.log(JSON.stringify(curr))
        return curr
    }
}


export {commands}