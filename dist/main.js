"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const manager_1 = require("./manager");
const fs = require("fs");
const crypto = require("crypto");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function promptForCommand(curr) {
    rl.question(">>: ", async (command) => {
        /* generer un fichier avec une commande
        *  garder le fichier en memoire entre deux commandes
        */
        let curr = {};
        curr = {
            hello: "michel le dieu"
        };
        if (command === "out") {
            let now = new Date().getTime();
            let hasher = crypto.createHash("sha256").update(now.toString()).digest("hex");
            fs.writeFileSync(hasher, JSON.stringify(curr));
        }
        // Process the entered command
        let out = await (0, manager_1.default)(command.trim());
        // Prompt for the next command
        if (!out)
            promptForCommand(curr);
        else
            process.exit();
    });
}
promptForCommand({});
