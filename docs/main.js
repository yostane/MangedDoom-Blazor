// INPUTS
const upKeys = new Set(),
    downKeys = new Set();
document.body.addEventListener("keydown", function (e) {
    e.preventDefault();
    upKeys.delete(e.keyCode)
    downKeys.add(e.keyCode)
});
document.body.addEventListener("keyup", function (e) {
    e.preventDefault();
    upKeys.add(e.keyCode)
    downKeys.delete(e.keyCode)
});

// RENDER WORKER
let canvas;
const renderWorker = new Worker('render-worker.js')
function triggerRender(screenData, colors){
    if(!canvas){
        canvas = document.getElementById("canvas").transferControlToOffscreen();
        renderWorker.postMessage({ canvas }, [ canvas ])
    }
    renderWorker.postMessage({ screenData, colors })
}

// AUDIO WORKER
let audioHelper;
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

// GAME LOOP
const frameTime = 35;
let lastFrameTimestamp = -frameTime;

window.gameLoop = function (timestamp) {
    /*if (timestamp - lastFrameTimestamp >= frameTime) {
    lastFrameTimestamp = timestamp;*/
    DotNet.invokeMethod('BlazorDoom', 'GameLoop', [...downKeys], [...upKeys]);
    upKeys.clear()
    //}

    window.requestAnimationFrame(window.gameLoop);
}