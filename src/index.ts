import handleCommand from "./command.js";

/**
 * @param {string[]} args command line arguments 
 * @returns {number} exit code of operation
 */
async function main(args:string[]){
    if(args.length == 0){
        console.error("Error: no command provided");
        return 1;
    }
    const exitCode = await handleCommand(args); // 
    return exitCode;
}

const args:string[] = process.argv.splice(2);
process.exit(await main(args));

