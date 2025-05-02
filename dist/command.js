import {getUserFile, setUserFile} from "./file.js";

const commands = {
    "pull":pull,
    "host":undefined,
    "list":undefined,
    "config":undefined
}

async function pull(){
    // say we have to download vault from 192.168.8.107:9000/vault.zip
    const userFile = await getUserFile("");
}


/**
 * Handles command line argument commands provided
 * @params args - array of commands separated by spaces
 * @returns exit status code of command
 */
export default async function handleCommand(args){
    
}
