"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readline = require("readline");
const manager_1 = require("./manager");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
async function promptForCommand() {
    rl.question(">>: ", async (command) => {
        // Process the entered command
        let out = await (0, manager_1.default)(command.trim());
        // Prompt for the next command
        if (!out)
            promptForCommand();
        else
            process.exit();
    });
}
promptForCommand();
