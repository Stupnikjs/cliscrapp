"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indeedScrapper_1 = require("./scrapper/indeedScrapper");
async function manager(command) {
    let indeedScrap = new indeedScrapper_1.indeedScrapper();
    let list = ["q", "hello", "list"];
    if (command === "list") {
        for (let item of list) {
            console.log(item + "\n");
        }
        return false;
    }
    if (command === "hello") {
        await indeedScrap.scrap();
        return false;
    }
    if (command == "obj")
        indeedScrap.getPopularSkills();
    if (command === "q") {
        return true;
    }
    else {
        console.log("commande non definie");
        return false;
    }
}
exports.default = manager;
