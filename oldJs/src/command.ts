
const COMMANDS:{[command:string]:(args:string[])=>void} = {
    pull:()=>console.log("pulling..."),
    host:()=>console.log("hosting..."),
    list:()=>console.log("listing..."),
    config:()=>console.log("configuring..."),
    exit:()=>console.log("Exiting...")
}

export default COMMANDS;