import * as fs from "fs/promises";
import * as path from "path";
import UserFile, {FileData} from "./userfile";

import {getUserFile, setUserFile, zip, unzip} from "./file.js";
import downloadFile from "./fileDownload.js";

const commands:{[command:string]:(args:string[])=>Promise<number>} = {
    "pull":pull,
    "host":host,
    "list":list,
    "config":config
}

async function pull(args:string[]){
    let exitCode = 0;
    
    // say we have to download vault from 192.168.8.107:9000/vault.zip
    const userFile = "./user/userFile.json";
    // TODO: make userfile changable
    // TODO: change ./user/uesrFile.json -> ./user/userFile.json
    const userData:UserFile = await getUserFile(userFile);
    // console.log(userData);
    const file = args[0];
    
    if(!file){
        console.log("No argument provided for pull");
        return 1;
    }

    //TODO : Allow custom url with --url flag

    if(!userData.file){
        console.log("No file found in user file");
        return 1;
    }

    if(!(file in userData.file)){
        console.log(`No pull path found maching value \"${file}\"`);
        return 1;
    }

    // Download file
    exitCode += await downloadFile(userData.repo, userData.file[file]);
    
    // Move file to destination
    exitCode += await moveToDestination(userData.file[file]);

    return exitCode;
}

async function moveToDestination(file:FileData):Promise<number>{
    let exitCode = 0;
    
    exitCode =+ await unzip(file.name);
    // await fs.rm(file.name);

    // if(exitCode>0){
    //     // Error from unzip function
    //     return exitCode;
    // }
    
    // // Moving to destination
    // // TODO: make it move folder/file insted of archive
    // //       delete archive
    // // TODO: also it deletes archive from shared folder
    // try{
    //     await fs.rename(   // path.dirname(import.meta.dirname) -> project root dir
    //         `${path.dirname(import.meta.dirname)}/shared/${file.name}`, 
    //         `${file.destination}/${file.name}`); // TODO: make platform independent path

    //     console.log("Moved to ", file.destination);
    // }catch(err:unknown){
    //     if(!(err instanceof Error)){
    //         console.log("Error unknown"); // TODO: do something about this
    //         return 1;
    //     }

    //     if(!(err.message.split(" ")[0].includes("ENOTEMPTY"))){
    //         console.log("Unexpected Error:");
	// 		console.log(err.message);
    //         exitCode += 1;
    //     }

    //     // Assuming that error is because file exists
    //     console.log("File already exists at destination\n"+
    //             "Reattemping after deleting destination..."); 
    //             // TODO: user input to decide whether to delete existing file
    //     await fs.rm(file.destination, 
    //         {recursive:true, force:true});

    //     // move to final destination
    //     await fs.rename(
    //         `${path.dirname(import.meta.dirname)}/shared/${file.name}`, 
    //         `${file.destination}/${file.name}`)
    //         .catch(err=>{
    //             console.log("Unexpected Error:");
    //             console.log(err);
    //             exitCode +=1;
    //         });
    // }
    
    return exitCode;
}

async function host(args:string[]){
    console.log("Host function");
    console.log(args);
    return 0;
}

async function list(args:string[]){
    console.log("List function");
    console.log(args);
    return 0;
}

async function config(args:string[]){
    console.log("Config function");
    console.log(args);
    return 0;
}

/**
 * Handles command line argument commands provided
 * @params args - array of commands separated by spaces
 * @returns exit status code of command
 */
export default async function handleCommand(args:string[]){
    const command = args[0].trim().toLowerCase();
    
    if(!(command in commands)){
        console.error(`Command not found: ${command}`);
        return 1;
    }

    const exitCode = await commands[command](args.slice(1));
    return exitCode;
}
