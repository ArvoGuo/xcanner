#!/usr/bin/env node

const { program } = require("commander");
const PortScanner = require("../src/lib/portScanner");
const MD5Blast = require("../src/lib/md5Blast");

program
  .command("scan-port")
  .description(
    "scan ports, default port range is from 0 to 65535. ex, scan-port 127.0.0.1"
  )
  .argument("IP", "Server IP Address")
  .option("-p, --port <number>", "server port")
  .option("-f, --from <number>", "start port")
  .option("-t, --to <number>", "end port")
  .action(async (IP, options) => {
    let result = await PortScanner({
      host: IP,
      port: options.port,
      from: options.from,
      to: options.to,
    });
    console.log(result);
  });

program
  .command("md5-blast")
  .description(
    "md5 blasts, traverses the data interval, and finds the md5 signal starting with the target string"
  )
  .argument("targetString", "the target string")
  .option("-f, --from <number>", "start number")
  .option("-t, --to <number>", "end number")
  .action(async (targetString, options) => {
    let result = await MD5Blast({
      from: options.from,
      to: options.to,
      target: targetString,
    });
    console.log(result);
  });

program.parse();
