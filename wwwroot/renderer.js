/**
 *
 * @param {number[]} screenData: byte array
 * @param {number[]} colors: unit array
 */
export function renderWithColorsAndScreenDataUnmarshalled(screenData, colors) {
    const width = 320;
    const height = 200;
    const canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    context.imageSmoothingEnabled = false;
    // TODO: create only two imageData and reuse them
    const imageData = context.createImageData(width, height);
    let y = 0;
    let x = 0;
    for (let i = 0; i < screenData.length; i += 1) {
        const dataIndex = (y * width + x) * 4;
        setSinglePixel(imageData, dataIndex, colors, screenData[i]);
        if (y >= height - 1) {
            y = 0;
            x += 1;
        } else {
            y += 1;
        }
    }
    context.putImageData(imageData, 0, 0);
}

function setSinglePixel(imageData, dataIndex, colors, colorIndex) {
    const color = colors[colorIndex];
    imageData.data[dataIndex] = color & 0xff;
    imageData.data[dataIndex + 1] = (color >> 8) & 0xff;
    imageData.data[dataIndex + 2] = (color >> 16) & 0xff;
    imageData.data[dataIndex + 3] = 255;
}

let audioContext;
const numberOfChannels = 8;
let soundSource;
export function playSound(samples, sampleRate, channel) {
    if (!audioContext) {
        console.log("creating audio context", numberOfChannels, sampleRate);
        audioContext = new AudioContext({
            numberOfChannels: numberOfChannels,
        });
    }

    const audioBuffer = audioContext.createBuffer(
        numberOfChannels,
        samples.length,
        sampleRate
    );

    var channelData = audioBuffer.getChannelData(channel);
    for (let i = 0; i < samples.length; i++) {
        // normalize the sample to be between -1 and 1
        channelData[i] = samples[i] / 32767;
    }

    // if (soundSource) {
    //     soundSource.stop();
    // }

    soundSource = audioContext.createBufferSource();
    soundSource.buffer = audioBuffer;
    soundSource.connect(audioContext.destination);
    soundSource.start();
}

// Todo: play music in bigger and sync the playback
let source;
let musicChannelData;
let musicBuffer;
export function playMusic(samples, sampleRate, channel) {
    if (!audioContext) {
        try {
            audioContext = new AudioContext({
                numberOfChannels: numberOfChannels,
            });
        } catch (e) {
            console.error(e);
            return;
        }
    }

    if (!musicBuffer) {
        musicBuffer = audioContext.createBuffer(1, samples.length, sampleRate);
        musicChannelData = musicBuffer.getChannelData(0);
    }

    if (source) {
        source.stop();
    }
    source = audioContext.createBufferSource();
    source.buffer = musicBuffer;
    source.connect(audioContext.destination);

    for (let i = 0; i < samples.length; i++) {
        // noralize the sample to be between -1 and 1
        musicChannelData[i] = samples[i] / 32767;
    }

    source.start();
}