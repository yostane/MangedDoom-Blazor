# Manager doom Blazor

![Logo](./media/logo.jpg)

This is a quick port of Blazor Wasm port of [Managed Doom](https://github.com/sinshu/managed-doom)

You can try it here: [demo](https://yostane.github.io/MangedDoom-Blazor/)

## Running the webapp locally

- Dotnet version used is specified in [global.json](./global.json)
- Run this command in this folder.

```sh
dotnet run --pathbase=/MangedDoom-Blazor
```

- Then, open this link in your browser: [http://localhost:5000/MangedDoom-Blazor/](http://localhost:5000/MangedDoom-Blazor/)
- If you encounter a `System.Globalization.CultureNotFoundException`, try to set the DOTNET_SYSTEM_GLOBALIZATION_INVARIANT to 0.
  - PowerShell: `$Env:DOTNET_SYSTEM_GLOBALIZATION_INVARIANT = 0`
  - cmd: `set DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=0`

## TODO

- Update to stable version dotnet 5 (when available)
- Optimize sound: cache sound samples in JS side
- Implement mouse controls
- Implement save and load
- Fix bugs
