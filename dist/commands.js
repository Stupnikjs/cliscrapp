"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const indeedScrapper_1 = require("./scrapper/indeedScrapper");
const fs = require("fs");
const crypto = require("crypto");
const poleemploiScrapper_1 = require("./scrapper/poleemploiScrapper");
function printHelp() {
    console.log("----------------- help ----------------");
    for (let command of Object.keys(commands)) {
        console.log(command);
    }
}
let helloScrap = new indeedScrapper_1.indeedScrapper();
let polemp = new poleemploiScrapper_1.poleemploiScrapper();
let commands = {
    help: async function (curr) { printHelp(); return curr; },
    hello: async function (curr) { await helloScrap.scrap(); return curr; },
    pole: async function (curr) { await polemp.scrap(); },
    out: async function (curr) {
        console.log("out");
        let now = new Date().getTime();
        let hasher = crypto.createHash("sha256").update(now.toString()).digest("hex");
        fs.writeFile(hasher + ".txt", JSON.stringify(curr), (err) => {
            if (err)
                console.log(err);
        });
        curr = {};
        return curr;
    },
    random: async (curr) => {
        curr = { random: crypto.randomBytes(6).toString("hex") };
        return curr;
    },
    scrap: async (curr) => {
        curr = await helloScrap.scrap();
        return curr;
    },
    print: async (curr) => {
        console.log(JSON.stringify(curr));
        return curr;
    },
};
exports.commands = commands;
