// import handleCommand from "./command.js";

// async function main(args){
//     console.log("something");
//     const exitCode = await handleCommand(args); // 
//     return exitCode;
// }


import server from "./server.js";
// const args = process.argv.splice(2);
// process.exit(await main(args));

server.listen(8080, () => {
    console.log(`File server running at http://localhost:${8080}/`);
});
