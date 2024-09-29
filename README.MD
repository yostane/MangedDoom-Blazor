# Managed doom Blazor

![Logo](./media/logo.jpg)

This is a quick port of Blazor Wasm port of [Managed Doom](https://github.com/sinshu/managed-doom)

You can try it here: [demo](https://yostane.github.io/MangedDoom-Blazor/)

## Running the webapp locally


```sh
#prerequisites
dotnet workload install wasm-tools wasm-experimental
dotnet tool install -g dotnet-serve
```

```sh
dotnet publish -c Release BlazorDoom.csproj && dotnet serve -d:bin/Release/net9.0/publish/wwwroot -p 8080 -S --path-base '/MangedDoom-Blazor'
```

- Then, open this link in your browser: [http://localhost:8080/MangedDoom-Blazor/](http://localhost:8080/MangedDoom-Blazor/)

## TODO

- Implement mouse controls
- Implement save and load

## Userful scripts

```pwsh
# List all relative files (for pwa)
Get-ChildItem -Recurse  -File -Name | % { '"./' + ($_ -replace '[\\/]', '/') + '",' }
Get-ChildItem -Recurse  -File -Name -Exclude *.br,*.gz  | % { '"./' + ($_ -replace '[\\/]', '/') + '",' }

dotnet tool install --global dotnet-serve
```
