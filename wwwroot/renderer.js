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

class AudioManager {
  /**
   * @type {AudioBuffer}
   */
  static #musicBuffer;
  static #currentMusicBufferIndex = 0;
  /**
   * @type {Float32Array}
   */
  static #currentChannelData;

  /**
   * @type {AudioContext}
   */
  static #audioContext;
  static expectedBufferEndTime = 0;
  static musicSampleRate = 44100;
  /**
   *
   * @returns {AudioContext}
   */
  static getAudioContext() {
    const numberOfChannels = 9;
    if (!this.#audioContext) {
      try {
        this.#audioContext = new AudioContext({
          numberOfChannels: numberOfChannels,
        });
        this.#createMusicBuffer();
      } catch (e) {
        // console.error(e);
        return;
      }
    }
    return this.#audioContext;
  }

  static #createMusicBuffer() {
    this.#musicBuffer = this.#audioContext.createBuffer(1, 44100, this.musicSampleRate);
    this.#currentMusicBufferIndex = 0;
    this.#currentChannelData = this.#musicBuffer.getChannelData(0);
  }

  /**
 * @param {int[]} samples
 * @param {int} sampleRate
 */
  static playMusic(samples) {
    if (!this.getAudioContext()) {
      return;
    }
    if (this.#currentMusicBufferIndex >= this.#musicBuffer.length) {
      const currentTime = this.#audioContext.currentTime;
      const source = this.#audioContext.createBufferSource();
      source.buffer = this.#musicBuffer;
      source.connect(this.#audioContext.destination);
      const duration = this.#currentMusicBufferIndex / this.musicSampleRate;
      source.start(this.expectedBufferEndTime, 0, duration);
      this.expectedBufferEndTime = currentTime + duration;
      this.#createMusicBuffer();
    }
    for (let i = 0; i < samples.length; i++) {
      // normalize the sample between -1 and 1
      this.#currentChannelData[this.#currentMusicBufferIndex + i] = samples[i] / 32767;
    }
    this.#currentMusicBufferIndex += samples.length;
  }
}

let soundSource;
export function playSound(samples, sampleRate, channel) {
  const audioContext = AudioManager.getAudioContext();
  if (!audioContext) {
    return;
  }
  const audioBuffer = audioContext.createBuffer(1, samples.length, sampleRate);

  var channelData = audioBuffer.getChannelData(0);
  for (let i = 0; i < samples.length; i++) {
    // normalize the sample to be between -1 and 1
    channelData[i] = samples[i] / 32767;
  }

  soundSource = audioContext.createBufferSource();
  soundSource.buffer = audioBuffer;
  soundSource.connect(audioContext.destination);
  soundSource.start();
}

/**
 *
 * @param {int[]} samples
 * @param {int} sampleRate
 * @param {int} channel
 * @returns
 */
export function playMusic(samples, sampleRate, channel) {
  AudioManager.playMusic(samples);
}
