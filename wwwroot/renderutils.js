window.loadImageBytesIntoCanvas = (data, width, height) => {
  console.time("canvas render");
  const canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  //console.log(data.length, width, height, canvas, context, data);
  const imageData = context.getImageData(0, 0, width, height);
  let x = 0;
  let y = 0;
  var data = window.atob(data);
  for (var i = 0; i < data.length; i += 4) {
    imageData.data[y * (width * 4) + x] = data.charCodeAt(i);
    imageData.data[y * (width * 4) + x + 1] = data.charCodeAt(i + 1);
    imageData.data[y * (width * 4) + x + 2] = data.charCodeAt(i + 2);
    imageData.data[y * (width * 4) + x + 3] = data.charCodeAt(i + 3);
    if (y >= height - 1) {
      y = 0;
      x += 4;
    } else {
      y += 1;
    }
  }
  context.putImageData(imageData, 0, 0);
  console.timeEnd("canvas render");
};

/*
var screenData = screen.Data;
            var p = MemoryMarshal.Cast<byte, uint>(sfmlTextureData);
            for (var i = 0; i < p.Length; i++)
            {
                p[i] = colors[screenData[i]];
            }
*/
window.renderWithColorsAndScreenData = (screenData, colors, width, height) => {
  const canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  const imageData = context.getImageData(0, 0, width, height);
  let x = 0;
  let y = 0;
  var screenData = window.atob(screenData);
  for (var i = 0; i < width * height * 4; i += 4) {
    const color = colors[screenData.charCodeAt(i / 4)];
    imageData.data[y * (width * 4) + x] = color & 0xff;
    imageData.data[y * (width * 4) + x + 1] = (color >> 8) & 0xff;
    imageData.data[y * (width * 4) + x + 2] = (color >> 16) & 0xff;
    imageData.data[y * (width * 4) + x + 3] = 255;
    if (y >= height - 1) {
      y = 0;
      x += 4;
    } else {
      y += 1;
    }
  }
  context.putImageData(imageData, 0, 0);
};

window.renderWithColorsAndScreenDataUnmarshalled = (screenData, colors) => {
  //console.time("renderWithColorsAndScreenDataUnmarshalled js");
  const width = 320;
  const height = 200;
  const canvas = document.getElementById("canvas");
  var context = canvas.getContext("2d");
  context.imageSmoothingEnabled = false;
  const imageData = context.createImageData(width, height);
  let x = 0;
  let y = 0;
  for (var i = 0; i < (width * height) / 4; i += 1) {
    const screenDataItem = BINDING.mono_array_get(screenData, i);
    let dataIndex;

    dataIndex = y * (width * 4) + x;
    setSinglePixel(imageData, dataIndex, colors, screenDataItem & 0xff);
    if (y >= height - 1) {
      y = 0;
      x += 4;
    } else {
      y += 1;
    }
    dataIndex = y * (width * 4) + x;

    setSinglePixel(imageData, dataIndex, colors, (screenDataItem >> 8) & 0xff);
    if (y >= height - 1) {
      y = 0;
      x += 4;
    } else {
      y += 1;
    }
    dataIndex = y * (width * 4) + x;
    setSinglePixel(imageData, dataIndex, colors, (screenDataItem >> 16) & 0xff);
    if (y >= height - 1) {
      y = 0;
      x += 4;
    } else {
      y += 1;
    }
    dataIndex = y * (width * 4) + x;
    setSinglePixel(imageData, dataIndex, colors, (screenDataItem >> 24) & 0xff);
    if (y >= height - 1) {
      y = 0;
      x += 4;
    } else {
      y += 1;
    }
  }
  context.putImageData(imageData, 0, 0);
  //console.timeEnd("renderWithColorsAndScreenDataUnmarshalled js");
};

function setSinglePixel(imageData, dataIndex, colors, colorIndex) {
  const color = BINDING.mono_array_get(colors, colorIndex);
  imageData.data[dataIndex] = color & 0xff;
  imageData.data[dataIndex + 1] = (color >> 8) & 0xff;
  imageData.data[dataIndex + 2] = (color >> 16) & 0xff;
  imageData.data[dataIndex + 3] = 255;
}
