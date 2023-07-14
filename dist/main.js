"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const manager_1 = require("./manager");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function promptForCommand(current) {
    rl.question(">>: ", async (command) => {
        /* generer un fichier avec une commande
        *  garder le fichier en memoire entre deux commandes
        */
        // process the command 
        // Prompt for the next command
        if (command !== "q") {
            let x = ">";
            let interval = setInterval(() => {
                process.stdout.write(x);
            }, 100);
            let curr = await (0, manager_1.default)(command.trim(), current);
            clearInterval(interval);
            promptForCommand(curr);
        }
        else {
            console.log("quiting");
            process.exit();
        }
    });
}
promptForCommand({});
