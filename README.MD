# Managed doom Blazor

![Logo](./media/logo.jpg)

This is a quick port of Blazor Wasm port of [Managed Doom](https://github.com/sinshu/managed-doom)

You can try it here: [demo](https://yostane.github.io/MangedDoom-Blazor/)

## Running the webapp locally

-   Dotnet version used is specified in [global.json](./global.json)
-   Run this command in this folder.

```sh
dotnet run --pathbase=/MangedDoom-Blazor
```

-   Then, open this link in your browser: [http://localhost:5000/MangedDoom-Blazor/](http://localhost:5000/MangedDoom-Blazor/)
-   If you encounter a `System.Globalization.CultureNotFoundException`, try to set the DOTNET_SYSTEM_GLOBALIZATION_INVARIANT to 0.
    -   PowerShell: `$Env:DOTNET_SYSTEM_GLOBALIZATION_INVARIANT = 0`
    -   cmd: `set DOTNET_SYSTEM_GLOBALIZATION_INVARIANT=0`

## TODO

-   Update to stable version dotnet 5 (when available)
-   Optimize sound: cache sound samples in JS side
-   Implement mouse controls
-   Implement save and load
-   Fix bugs

## Common issues

```sh
❯ dotnet restore
MSBUILD : error MSB1025: An internal failure occurred while running MSBuild.
System.Globalization.CultureNotFoundException: Only the invariant culture is supported in globalization-invariant mode. See https://aka.ms/GlobalizationInvariantMode for more information. (Parameter 'name')
en-US is an invalid culture identifier.
   at System.Globalization.CultureInfo..ctor(String name, Boolean useUserOverride)
   at Microsoft.Build.CommandLine.MSBuildApp.SetConsoleUI()
   at Microsoft.Build.CommandLine.MSBuildApp.Execute(String[] commandLine)
Unhandled exception: System.Globalization.CultureNotFoundException: Only the invariant culture is supported in globalization-invariant mode. See https://aka.ms/GlobalizationInvariantMode for more information. (Parameter 'name')
en-US is an invalid culture identifier.
   at System.Globalization.CultureInfo..ctor(String name, Boolean useUserOverride)
   at Microsoft.Build.CommandLine.MSBuildApp.SetConsoleUI()
   at Microsoft.Build.CommandLine.MSBuildApp.Execute(String[] commandLine)
   at Microsoft.Build.CommandLine.MSBuildApp.Main(String[] args)
   at Microsoft.DotNet.Cli.Utils.MSBuildForwardingAppWithoutLogging.ExecuteInProc(String[] arguments)
```
