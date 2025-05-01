import {exec} from "child_process";
import * as fs from "fs/promises";

/**
   tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
   -> tar -cf vault.zip vault/

   tar -tvf archive.tar         # List all files in archive.tar verbosely.
   tar -xf archive.tar          # Extract all files from archive.tar.
   -> tar -xf vault.zip
*/

const folder = "~/Documents/vault/vault_01/";
const archive = "vault_01.zip";

export function zip(folder){

    let exitCode = exec(`tar`, (error, stdout, stderr)=>{
	if(error){
	    console.log(error.message);
	    return 1;
	}

	if(stderr){
	    //console.error("stderr: " + stderr);
	    return stderr;
	}

	console.log(`stdout: \n${stdout}`);
	return 0;
    })
}

export function unzip(archive){}

async function getUserFile(userFile){
    const data = await fs.readFile(userFile, "utf8");
    console.log(data);
}

async function setUserFile(userFile, data){
    await fs.writeFile(userFile, data);
}

