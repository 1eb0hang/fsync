import { exec } from "child_process";
import * as fs from "fs/promises";
import * as path from "path";
/**
   tar -cf archive.tar foo bar  # Create archive.tar from files foo and bar.
   -> tar -cf vault.zip vault/

   tar -tvf archive.tar         # List all files in archive.tar verbosely.
   tar -xf archive.tar          # Extract all files from archive.tar.
   -> tar -xf vault.zip
*/
// const folder = "~/Documents/vault/vault_01/";
// const archive = "vault_01.zip";
export function zip(folder, archiveName = undefined) {
    if (!archiveName) {
        archiveName = folder;
    }
    let exitCode = exec(`tar -cf ${archiveName}.zip ${folder}`, (error, stdout, stderr) => {
        if (error) {
            console.log(error.message);
            return 1;
        }
        if (stderr) {
            //console.error("stderr: " + stderr);
            return stderr;
        }
        console.log(`stdout: \n${stdout}`);
        return 0;
    });
}
export async function unzip(archive) {
    console.log(`Executing: tar -xf ${archive}`);
    return new Promise((resolve, reject) => {
        let exitCode = exec(`tar -xf ${archive}`, (error, stdout, stderr) => {
            if (error) {
                console.log(error.message);
                reject(1);
            }
            if (stderr) {
                console.error("stderr: " + stderr);
                reject(1);
            }
            resolve(exitCode);
        });
    });
}
export async function getUserFile(userFile) {
    let data;
    try {
        data = await fs.readFile(userFile, "utf8");
        data = JSON.parse(data);
    }
    catch (err) {
        if (typeof err == "object" && err.code == "ENOENT") {
            console.log("Error: user file not found\nCreating user file at " + userFile);
            createUserFile(userFile);
            data = {};
        }
        else {
            console.log(err);
            data = undefined;
        }
    }
    return data;
}
export async function setUserFile(userFile, data) {
    // TODO: check if path to userfile exists
    await fs.writeFile(userFile, data);
}
function createUserFile(filepath) {
    fs.mkdir(path.dirname(filepath), { recursive: true });
    fs.writeFile(filepath, JSON.stringify({}));
}
