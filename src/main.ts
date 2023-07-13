import * as readline from "readline";
import manager from "./manager";


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});




async function promptForCommand(current:object) {
  
  rl.question(">>: ", async (command) => {
    
    /* generer un fichier avec une commande  
    *  garder le fichier en memoire entre deux commandes  
    */

    
      // process the command 
     
      // Prompt for the next command
      if (command !== "q") {
        let curr = await manager(command.trim(), current)
        promptForCommand(curr);

      }
      else {
        console.log("quiting")
        process.exit()
      }
    });
  
}

promptForCommand({});









