class AudioHelper {
  constructor() {}

  playByteArray(samples, sampleRate) {
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
}
