import handleCommand from "./command.js";

async function main(args){
    const exitCode = await handleCommand(args); // 
    return exitCode;
}

const args = process.argv.splice(2);
process.exit(await main(args));

