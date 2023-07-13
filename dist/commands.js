"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const indeedScrapper_1 = require("./scrapper/indeedScrapper");
function printHelp() {
    console.log("----------------- help ----------------");
}
let helloScrap = new indeedScrapper_1.indeedScrapper();
let commands = {
    q: async function () { console.log("quiting"); return true; },
    help: async function () { printHelp(); },
    hello: async function () { await helloScrap.scrap(); }
};
exports.commands = commands;
