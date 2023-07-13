"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
const indeedScrapper_1 = require("./scrapper/indeedScrapper");
const fs = require("fs");
const crypto = require("crypto");
function printHelp() {
    console.log("----------------- help ----------------");
}
let helloScrap = new indeedScrapper_1.indeedScrapper();
let commands = {
    help: async function (curr) { printHelp(); return curr; },
    hello: async function (curr) { await helloScrap.scrap(); return curr; },
    out: async function (curr) {
        console.log("out");
        let now = new Date().getTime();
        console.log(now);
        let hasher = crypto.createHash("sha256").update(now.toString()).digest("hex");
        fs.writeFile(hasher, JSON.stringify(curr), (err) => {
            if (err)
                console.log(err);
        });
        curr = {};
        return curr;
    },
    test: async (curr) => {
        console.log("test");
        curr = { michel: "montaigne" };
        return curr;
    },
    random: async (curr) => {
        curr = { random: crypto.randomBytes(6).toString("hex") };
        return curr;
    },
    print: async (curr) => {
        console.log(JSON.stringify(curr));
        return curr;
    }
};
exports.commands = commands;
