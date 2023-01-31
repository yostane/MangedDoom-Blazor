namespace BlazorDoom
{
    static ManagedDoom.DoomApplication app = null;

    private string wadUrl = "./doom1.wad";

    bool calledAfterRender = false;

    static float framesPerSecond;

    private string[] args = { };
    private string[] configLines = { };

    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        await StartGame();
    }

    private async Task StartGame()
    {
        Console.WriteLine(wadUrl);
        app = null;
        var stream = await Http.GetStreamAsync(wadUrl);
        var commandLineArgs = new ManagedDoom.CommandLineArgs(args);
        app = new ManagedDoom.DoomApplication(commandLineArgs, configLines, Http,
        stream, jsRuntime, jsProcessRuntime, webAssemblyJSRuntime, wadUrl);
        jsProcessRuntime.InvokeVoid("gameLoop");
    }

    [JSInvokable("GameLoop")]
    [JSExport]
    public static void GameLoop(uint[] downKeys, uint[] upKeys)
    {
        if (app == null)
        {
            return;
        }

        //var watch = System.Diagnostics.Stopwatch.StartNew();
        app.Run(downKeys, upKeys);
        //watch.Stop();
        //Console.WriteLine($"fps {1000 / (float)(watch.ElapsedMilliseconds)}", );
    }

}