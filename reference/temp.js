import * as fs from "fs/promises";

try{
    console.log(import.meta.dirname);
    console.log(import.meta.filename);
    let strpath = await fs.realpath(".")
    console.log(strpath);
}catch(error){
    console.error("Error: ", error.message);
}
