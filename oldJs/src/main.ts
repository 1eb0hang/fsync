// import handleCommand from "./command.js";

// async function main(args:string[]):Promise<number>{
//     if(args.length == 0){
//         console.error("Error: no command provided");
//         return 1;
//     }
//     const exitCode = await handleCommand(args); // 
//     return exitCode;
// }

// const args:string[] = process.argv.splice(2);
// process.exit(await main(args));
import readline from "node:readline";
import COMMANDS from "./command.js";

const main = (args:string[]):number=>{
    let running = true;
    const read = readline.createInterface({
        input:process.stdin,
        output: process.stdout
    });

    // while(running){
    //     read.question(">> ",(command:string)=>{
    //         console.log("executing ", command);
    //         COMMANDS[command.split(" ")[0]];
    //         if(command.toLowerCase().startsWith("exit")){
    //             running = false;
    //         }
    //     }) 
    // }
    return 0;
}

process.stdin

const args:string[] = process.argv.splice(2);
process.exit(main(args));