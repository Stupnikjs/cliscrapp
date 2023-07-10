"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indeedScrapper_1 = require("./scrapper/indeedScrapper");
async function manager(command) {
    let list = ["q", "hello", "list"];
    if (command === "list") {
        for (let item of list) {
            console.log(item + "\n");
        }
        return false;
    }
    if (command === "hello") {
        let indeedScrap = new indeedScrapper_1.indeedScrapper();
        await indeedScrap.scrap();
        return false;
    }
    if (command === "q") {
        return true;
    }
    else {
        console.log("commande non definie");
        return false;
    }
}
exports.default = manager;
