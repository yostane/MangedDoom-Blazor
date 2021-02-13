# Manager doom Blazor

![Logo](./media/logo.jpg)

This is a quick port of Blazor Wasm port of [Managed Doom](https://github.com/sinshu/managed-doom)

You can try it here: [demo](https://yostane.github.io/MangedDoom-Blazor/)

dotnet version used is specified in [global.json](./global.json)

## Running the webapp locally

Make sure you have installed dotnet 5 preview 8. Then, run this command in this folder.

```sh
dotnet run --pathbase=/MangedDoom-Blazor
```

Then open this link in your browser: [http://localhost:5000/MangedDoom-Blazor/](http://localhost:5000/MangedDoom-Blazor/)

## TODO

- Update to stable version dotnet 5 (when available)
- Optimize sound: cache sound samples in JS side
- Implement mouse controls
- Implement save and load
- Fix bugs
