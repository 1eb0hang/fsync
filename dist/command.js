import {getUserFile, setUserFile} from "./file.js";

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
    
    return 0;
}

/**
 * Handles command line argument commands provided
 * @params args - array of commands separated by spaces
 * @returns exit status code of command
 */
export default async function handleCommand(args){
    const exitCode = await pull(args);
    return exitCode;
}

function handleIt(){}

