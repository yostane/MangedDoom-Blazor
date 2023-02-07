import { dotnet } from "./dotnet.js";

let exports;
// Launches the c# main
console.log("2");
const { getAssemblyExports, getConfig } = await dotnet.create();

console.log("3");
exports = await getAssemblyExports(getConfig().mainAssemblyName);

console.log("1");
await dotnet.run();
console.log("done");
