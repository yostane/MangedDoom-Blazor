import { dotnet } from "./_framework/dotnet.js";
import {
  renderWithColorsAndScreenDataUnmarshalled,
  playSound,
  playMusic,
} from "./renderer.js";

// Launches the c# main
console.log("Initializing dotnet from JS");
const { setModuleImports, getAssemblyExports, getConfig, runMain } =
  await dotnet.withApplicationArguments("start").create();

setModuleImports("blazorDoom/renderer.js", {
  renderWithColorsAndScreenDataUnmarshalled,
  playMusic,
  playSound,
});

setModuleImports("main.js", {
  getBaseUrl: () => window.location.href,
});

console.log("Getting exporteddotnet functions");
const exports = await getAssemblyExports(getConfig().mainAssemblyName);


document.getElementById("load_wad").addEventListener("click", () => {
  const choice = document.getElementById("wad_selection").value;
  exports.BlazorDoom.MainJS.LoadWad(choice);
});

// run the C# Main() method and keep the runtime process running and executing further API calls
console.log("Runnong C# Main");
await runMain();

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("service-worker.js")
    .then((registration) => {
      console.log("Service Worker registered:", registration);
    })
    .catch((error) => {
      console.error("Service Worker registration failed:", error);
    });
}

// frameTime = 33 or 16
// 60 fps -> 1 frame in 16.66 ms
const frameTime = 33;
let lastFrameTimestamp = -frameTime;
const fpsElement = document.getElementById("fps");
const fpsSmoothing = 0.9;
var fpsMeasure = 0;
const upKeys = [];
const downKeys = [];

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

console.log("Game loop started");

document.body.addEventListener("keydown", function (e) {
  if (e.target.tagName === "INPUT") {
    return true;
  }
  const index = downKeys.indexOf(e.key);
  if (index < 0) {
    downKeys.push(e.key);
  }
  e.preventDefault();
  return false;
});
document.body.addEventListener("keyup", function (e) {
  if (e.target.tagName === "INPUT") {
    return true;
  }
  const index = downKeys.indexOf(e.key);
  if (index > -1) {
    downKeys.splice(index, 1);
  }
  upKeys.push(e.key);
  e.preventDefault();
  return false;
});
