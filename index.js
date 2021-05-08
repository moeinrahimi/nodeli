#!/usr/bin/env node
const { program } = require('commander');
program.version('0.0.1');
const fs = require('fs').promises
const path =require('path')

const makeFile = (bpath,file) => {
  fs.writeFile(path.resolve(bpath,file),`//TODO: ${file}`).catch(e=>console.log(e))
}
const makeFolder = (bpath,name) => {
  fs.mkdir(path.resolve(bpath,name)).catch(e=>console.log(e))
}
program
  .command('init <name> ')
  .description('init new module')
  .action((name) => {
    doJOB(name)
  });
program.parse(process.argv)
async function doJOB(name){
  let moduleFolder =
    path.resolve(process.cwd()+'/modules/', name)
    await makeFolder(process.cwd()+'/modules/',name)
    await makeFolder(moduleFolder,"controller")
    await makeFolder(moduleFolder,"helper")
    await makeFolder(moduleFolder,"model")
    await makeFolder(moduleFolder,"apiSchema")
    makeFile(moduleFolder+'/apiSchema',"index.js")
    makeFile(moduleFolder+'/controller',name.toLowerCase()+'Controller.js')
    makeFile(moduleFolder+'/model',name+'.js')
    makeFile(moduleFolder+'/helper',name.toLowerCase()+'Helper.js')
}