import handleCommand from "./command.js";
import {getUserFile, setUserFile} from "./file.js";

function main(args){
    const exitCode = handleCommand(args); // 
    return exitCode;
}

// const args = process.argv.splice(2);
// process.exit(main(args));

getUserFile("./user/uesrFile.json");
