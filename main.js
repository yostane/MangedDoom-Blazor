import { dotnet } from "./dotnet.js";

// Launches the c# main
console.log("2");
const { getAssemblyExports, getConfig } = await dotnet.create();

console.log("3");
const exports = await getAssemblyExports(getConfig().mainAssemblyName);

console.log("1");
await dotnet.run();

let audioHelper;

// frameTime = 1000 / fps
const frameTime = 1000 / 35;
let lastFrameTimestamp = -frameTime;
const fpsElement = document.getElementById("fps");
const fpsSmoothing = 0.9;
var fpsMeasure = 0;

const upKeys = [];
const downKeys = [];

window.addEventListener("DOMContentLoaded", () => {
    document.body.addEventListener("keydown", function (e) {
        if (e.target.tagName === "INPUT") {
            return true;
        }
        const index = downKeys.indexOf(e.keyCode);
        if (index < 0) {
            downKeys.push(e.keyCode);
        }
        e.preventDefault();
        return false;
    });
    document.body.addEventListener("keyup", function (e) {
        if (e.target.tagName === "INPUT") {
            return true;
        }
        const index = downKeys.indexOf(e.keyCode);
        if (index > -1) {
            downKeys.splice(index, 1);
        }
        upKeys.push(e.keyCode);
        e.preventDefault();
        return false;
    });
});

async function gameLoop(timestamp) {
    const duration = timestamp - lastFrameTimestamp;
    if (duration >= frameTime) {
        var startTime = performance.now();
        // measure from https://stackoverflow.com/a/87333/13782429
        const currentFps = 1000 / duration;
        fpsMeasure =
            fpsMeasure * fpsSmoothing + currentFps * (1 - fpsSmoothing);
        lastFrameTimestamp = timestamp;
        exports.BlazorDoom.MainJS.GameLoop(upKeys, downKeys);
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

const sounds = new Map();

function playSound(samples, sampleRate, identifier, position) {
    //console.log(position);
    if (!audioHelper) {
        return;
    }
    sounds.set(identifier, samples);
    audioHelper.playByteArray(samples, sampleRate);
}

function playLoadedSound(identifier, sampleRate, position) {
    if (!audioHelper) {
        return;
    }
    const sound = sounds.get(identifier);
    audioHelper.playByteArray(sound, sampleRate);
}

function initAudioHelper() {
    if (!audioHelper) {
        audioHelper = new AudioHelper();
    }
}

gameLoop(0);

console.log("done");
