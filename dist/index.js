import handleCommand from "./command.js";
import 

async function main(args){
    console.log("something");
    const exitCode = await handleCommand(args); // 
    return exitCode;
}

const args = process.argv.splice(2);
process.exit(await main(args));


