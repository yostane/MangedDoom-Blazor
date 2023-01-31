import { dotnet } from "./dotnet.js";

let exports;
const { getAssemblyExports, getConfig } = await dotnet.create();

exports = await getAssemblyExports(getConfig().mainAssemblyName);

await dotnet.run();
