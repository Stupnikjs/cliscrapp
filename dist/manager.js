"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const indeedScrapper_1 = require("./scrapper/indeedScrapper");
const commands_1 = require("./commands");
async function manager(command) {
    let indeedScrap = new indeedScrapper_1.indeedScrapper();
    if (Object.keys(commands_1.commands).includes(command)) {
        return await commands_1.commands[command]();
    }
    else {
        console.log("commande non definie");
        return false;
    }
}
exports.default = manager;
