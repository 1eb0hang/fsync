
function main(args){
    console.log(args);
    return 1;
}

const args = process.argv.splice(2);
process.exit(main(args));
