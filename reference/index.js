import handleCommand from "./command.js";

async function main(args){
    if(args.length == 0){
        console.error("Error: no command provided");
        return 1;
    }
    const exitCode = await handleCommand(args); // 
    return exitCode;
}

const args = process.argv.splice(2);
process.exit(await main(args));

