import * as readline from "readline";
import manager from "./manager";
import * as fs from "fs"
import * as crypto from "crypto"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function promptForCommand(curr:object) {
  
  rl.question(">>: ", async (command) => {
    
    /* generer un fichier avec une commande  
    *  garder le fichier en memoire entre deux commandes  
    */

    let curr = {}

    curr = {
      hello : "michel le dieu"
    } 
    if (command === "out") {
      let now = new Date().getTime()
      let hasher = crypto.createHash("sha256").update(now.toString()).digest("hex")
      
      fs.writeFileSync(hasher, JSON.stringify(curr))

    } else {
      // process the command 
      let out = await manager(command.trim())
      // Prompt for the next command
      if (!out) promptForCommand(curr);
      else process.exit()
    }
    
  });
  
}

promptForCommand({});









