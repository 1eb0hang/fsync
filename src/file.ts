import {exec} from "child_process";
import * as fs from "fs/promises";
import * as path from "path";

import UserFile from "./userfile.js";
// import { exit } from "process";

//    tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
//    -> tar -cf vault.zip vault/

//    tar -tvf archive.tar         # List all files in archive.tar verbosely.
//    tar -xf archive.tar          # Extract all files from archive.tar.
//    -> tar -xf vault.zip

// const folder = "~/Documents/vault/vault_01/";
// const archive = "vault_01.zip";

export function zip(folder:string, archiveName?:string|null){
	if(!archiveName){
		archiveName = folder;
	}
	
    let exitCode = 0;
	exec(`tar -cf ${archiveName}.zip ${folder}`, (error, stdout, stderr)=>{
		if(error){
		    console.log(error.message);
		    exitCode = 1;
			return;
		}

		if(stderr){
		    //console.error("stderr: " + stderr);
			exitCode = 1
		    return;
		}

		console.log(`stdout: \n${stdout}`);
		return;
    });
	
	return exitCode;
}

export async function unzip(archive:string){
	console.log(`Executing: tar -xf downloads/${archive} -C downloads`);
	
	let exitCode = 0;
	// TODO : have a place where all of these little things that i need are stored in one place
	//			e.g. userpath, file download path, etc
	exec(`tar -xf downloads/${archive} -C downloads/__intermediate --strip-components 1`, 
		(error, stdout, stderr)=>{
		if(error){
		    console.log(error.message);
			exitCode += 1;
			return;
		}

		if(stderr){
		    console.error("stderr: " + stderr);
			exitCode += 1;
			return;
		}
    });
	return exitCode;
}

export async function getUserFile(userFile:string):Promise<UserFile>{
    let data:UserFile;
    try{
		data = JSON.parse(await fs.readFile(userFile, "utf8"));
    }catch(err:unknown){

		if(!(err instanceof Error)) { 
			// Unknown error
			console.log("Error Unknown");
			console.log("Could not read userfile: ");
			console.log(err);
			return {repo:[],file:{}};
		}

		if(err.message.split(" ")[0].toUpperCase().includes("ENOENT")){
			// File not found
			console.log("User file not found");
			console.log(`Creating user file at ${userFile}`);
			createUserFile(userFile);
			return {repo:[],file:{}};
		}else{
			console.log("Unexpected Error:");
			console.log(err.message);
		}
		data = {repo:[],file:{}};
    }

    return data;
}

export async function setUserFile(file:string, data:UserFile){
    // TODO: check if path to userfile exists
    await fs.writeFile(file, JSON.stringify(data));
}

function createUserFile(filepath:string){
    fs.mkdir(path.dirname(filepath), {recursive:true});
    fs.writeFile(filepath, JSON.stringify({}));
}
