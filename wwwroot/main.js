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
  const soundFont = document.getElementById("sf2_selection").value;
  exports.BlazorDoom.MainJS.LoadWad(choice, soundFont);
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
let frameTime = 33;

function toggleFps() {
  frameTime = frameTime === 16 ? 33 : 16;
}

document.getElementById("toggle_fps").addEventListener("click", toggleFps);

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
    fpsMeasure = fpsMeasure * fpsSmoothing + currentFps * (1 - fpsSmoothing);
    lastFrameTimestamp = timestamp;
    exports.BlazorDoom.MainJS.GameLoop(downKeys, upKeys);
    upKeys.splice(0, upKeys.length);
    var endTime = performance.now();
    fpsElement.innerText = `${fpsMeasure.toFixed(0)} FPS - ${duration.toFixed(
      0
    )}ms - ${(endTime - startTime).toFixed(0)}ms`;
  }
  requestAnimationFrame(gameLoop);
}

gameLoop(0);

console.log("Game loop started");

function handleKeyDown(key) {
  const index = downKeys.indexOf(key);
  if (index < 0) {
    downKeys.push(key);
  }
}

function handleKeyUp(key) {
  const index = downKeys.indexOf(key);
  if (index > -1) {
    downKeys.splice(index, 1);
  }
  upKeys.push(key);
}

document.body.addEventListener("keydown", function (e) {
  if (e.target.tagName === "INPUT") {
    return true;
  }
  handleKeyDown(e.keyCode);
  e.preventDefault();
  return false;
});
document.body.addEventListener("keyup", function (e) {
  if (e.target.tagName === "INPUT") {
    return true;
  }
  handleKeyUp(e.keyCode);
  e.preventDefault();
  return false;
});

window.GameController.init({
  left: {
    type: "dpad",
    dpad: {
      up: {
        touchStart: () => handleKeyDown(38),
        touchEnd: () => handleKeyUp(38),
      },
      down: {
        touchStart: () => handleKeyDown(40),
        touchEnd: () => handleKeyUp(40),
      },
      left: {
        touchStart: () => handleKeyDown(37),
        touchEnd: () => handleKeyUp(37),
      },
      right: {
        touchStart: () => handleKeyDown(39),
        touchEnd: () => handleKeyUp(39),
      },
    },
  },
  right: {
    type: "buttons",
    buttons: [
      {
        // space
        touchStart: () => handleKeyDown(32),
        touchEnd: () => handleKeyUp(32),
        label: "O",
      },
      {
        // ctrl
        touchStart: () => handleKeyDown(17),
        touchEnd: () => handleKeyUp(17),
        label: "F",
      },
      {
        // enter
        touchStart: () => handleKeyDown(13),
        touchEnd: () => handleKeyUp(13),
        label: "E",
      },
      false,
    ],
  },
});

//https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
let hasTouchScreen = false;
if ("maxTouchPoints" in navigator) {
  hasTouchScreen = navigator.maxTouchPoints > 0;
} else if ("msMaxTouchPoints" in navigator) {
  hasTouchScreen = navigator.msMaxTouchPoints > 0;
} else {
  const mQ = matchMedia?.("(pointer:coarse)");
  if (mQ?.media === "(pointer:coarse)") {
    hasTouchScreen = !!mQ.matches;
  } else if ("orientation" in window) {
    hasTouchScreen = true; // deprecated, but good fallback
  } else {
    // Only as a last resort, fall back to user agent sniffing
    const UA = navigator.userAgent;
    hasTouchScreen =
      /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
      /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
  }
}

if (!hasTouchScreen) {
  window.GameController.canvas.style.visibility = "hidden";
}
