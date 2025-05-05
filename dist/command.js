import {getUserFile, setUserFile} from "./file.js";
import downloadFile from "./fileDownload.js";

const commands = {
    "pull":pull,
    "host":undefined,
    "list":undefined,
    "config":undefined
}

async function pull(args){
    // say we have to download vault from 192.168.8.107:9000/vault.zip
    const userFile = "./user/uesrFile.json"; // TODO: make userfile changable
    const userData = await getUserFile(userFile);
    
    // check
    return 0;
}

/**
 * Handles command line argument commands provided
 * @params args - array of commands separated by spaces
 * @returns exit status code of command
 */
export default async function handleCommand(args){
    const command = args[0].trim().toLowerCase();
    if(!(command in commands)){
        console.error(`Command not found: ${command}`);
        return 1;
    }

    //const exitCode = await commands[args[0]](args.slice(1));
    console.log(`Command execute ${command}`);
    
    //return exitCode;
    return 0;
}
