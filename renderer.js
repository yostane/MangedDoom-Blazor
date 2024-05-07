/**
 *
 * @param {number[]} screenData: byte array
 * @param {number[]} colors: unit array
 */
export function renderWithColorsAndScreenDataUnmarshalled(screenData, colors) {
    //console.time("renderWithColorsAndScreenDataUnmarshalled js");
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

    //console.timeEnd("renderWithColorsAndScreenDataUnmarshalled js");
}

function setSinglePixel(imageData, dataIndex, colors, colorIndex) {
    const color = colors[colorIndex];
    imageData.data[dataIndex] = color & 0xff;
    imageData.data[dataIndex + 1] = (color >> 8) & 0xff;
    imageData.data[dataIndex + 2] = (color >> 16) & 0xff;
    imageData.data[dataIndex + 3] = 255;
}

export function playSound(samples, sampleRate) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.context = new AudioContext({
        sampleRate: sampleRate,
    });
    const length = samples.length;

    const audioBuffer = this.context.createBuffer(
        1,
        length,
        this.context.sampleRate
    );
    var channelData = audioBuffer.getChannelData(0);
    for (let i = 0; i < length; i += 2) {
        channelData[i] = samples[i] / 0xffff;
    }

    var source = this.context.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.context.destination);
    source.start();
}