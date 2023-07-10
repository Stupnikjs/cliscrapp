import * as readline from "readline";
import manager from "./manager";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptForCommand() {
 
  rl.question(">>: ", async (command) => {
    // Process the entered command
    let out = await manager(command.trim())

    // Prompt for the next command
    if (!out) promptForCommand();
    else process.exit()
  });
  
}

promptForCommand();









