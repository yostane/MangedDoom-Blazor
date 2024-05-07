import { dotnet } from "./dotnet.js";

// Launches the c# main
console.log("2");
const { getAssemblyExports, getConfig } = await dotnet.create();

console.log("3");
const exports = await getAssemblyExports(getConfig().mainAssemblyName);

console.log("1");
await dotnet.run();

// frameTime = 1000 / fps
// 60 fps -> 1 frame in 16.66 ms
const frameTime = 1000 / 35;
let lastFrameTimestamp = -frameTime;
const fpsElement = document.getElementById("fps");
const fpsSmoothing = 0.9;
var fpsMeasure = 0;

async function gameLoop(timestamp) {
    const duration = timestamp - lastFrameTimestamp;
    if (duration >= frameTime) {
        var startTime = performance.now();
        // measure from https://stackoverflow.com/a/87333/13782429
        const currentFps = 1000 / duration;
        fpsMeasure =
            fpsMeasure * fpsSmoothing + currentFps * (1 - fpsSmoothing);
        lastFrameTimestamp = timestamp;
        exports.BlazorDoom.MainJS.GameLoop(downKeys, upKeys);
        upKeys.splice(0, upKeys.length);
        var endTime = performance.now();
        fpsElement.innerText = `${fpsMeasure.toFixed(
            0
        )} FPS - ${duration.toFixed(0)}ms - ${(endTime - startTime).toFixed(
            0
        )}ms`;
    }
    requestAnimationFrame(gameLoop);
}

gameLoop(0);

console.log("done");
