import * as fs from "fs/promises";
import * as path from "path";
import { getUserFile, unzip } from "./file.js";
import downloadFile from "./fileDownload.js";
const commands = {
    "pull": pull,
    "host": host,
    "list": list,
    "config": config
};
async function pull(args) {
    let exitCode = 0;
    // say we have to download vault from 192.168.8.107:9000/vault.zip
    const userFile = "./user/uesrFile.json"; // TODO: make userfile changable
    const userData = await getUserFile(userFile);
    const file = args[0];
    if (!file) {
        console.log("No argument provided for pull");
        return 1;
    }
    if (!(file in userData.file)) {
        console.log(`No value found maching value \"${file}\"`);
        return 1;
    }
    // Download file
    exitCode = +await downloadFile(new URL(userData.file[file].url[0], "http://127.0.0.1:8000/"), userData.file[file].name);
    // Assume file is an archive
    exitCode = +await unzip(path.join(".", userData.file[file].name));
    await fs.rm(userData.file[file].name);
    // Movign to destination
    try {
        await fs.rename(`${path.dirname(import.meta.dirname)}/web-term`, userData.file[file].destination);
        console.log("Moved to ", userData.file[file].destination);
    }
    catch (err) {
        if (err.code == "ENOTEMPTY") {
            console.log("File already exists at destination\n" +
                "Reattemping after deleting destination...");
            await fs.rm(userData.file[file].destination, { recursive: true, force: true });
            await fs.rename(`${path.dirname(import.meta.dirname)}/web-term`, userData.file[file].destination).catch(err => {
                console.log(err);
                exitCode += 1;
            });
        }
    }
    return exitCode;
}
async function host(args) {
    console.log("Host function");
    console.log(args);
    return 0;
}
async function list(args) {
    console.log("List function");
    console.log(args);
    return 0;
}
async function config(args) {
    console.log("Config function");
    console.log(args);
    return 0;
}
/**
 * Handles command line argument commands provided
 * @params args - array of commands separated by spaces
 * @returns exit status code of command
 */
export default async function handleCommand(args) {
    const command = args[0].trim().toLowerCase();
    if (!(command in commands)) {
        console.error(`Command not found: ${command}`);
        return 1;
    }
    const exitCode = await commands[command](args.slice(1));
    return exitCode;
    // return 0;
}
