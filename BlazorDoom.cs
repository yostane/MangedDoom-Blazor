using System;
using System.Net.Http;
using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;
using System.Threading.Tasks;

namespace BlazorDoom
{
    // Must be named MainJS
    public partial class MainJS
    {
        static ManagedDoom.DoomApplication? app = null;

        private string wadUrl = "./doom1.wad";

        bool calledAfterRender = false;

        static float framesPerSecond;

        private string[] args = { };
        private string[] configLines = { };

        private async Task StartGame()
        {
            var http = new HttpClient();
            Console.WriteLine(wadUrl);
            app = null;
            var stream = await http.GetStreamAsync(wadUrl);
            var commandLineArgs = new ManagedDoom.CommandLineArgs(args);
            app = new ManagedDoom.DoomApplication(commandLineArgs, configLines, http, stream, wadUrl);
            //jsProcessRuntime.InvokeVoid("gameLoop");
        }

        [JSExport]
        public static void GameLoop(int[] downKeys, int[] upKeys)
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

        public static async Task Main()
        {
            if (!OperatingSystem.IsBrowser())
            {
                throw new PlatformNotSupportedException("This demo is expected to run on browser platform");
            }

            Console.WriteLine("Importing!");
            await JSHost.ImportAsync("BlazorDoom/renderutils.js", "renderutils.js");
            Console.WriteLine("Ready!");
        }
    }
}

// declare the JS signature
[SupportedOSPlatform("browser")]
public partial class RenderUtils
{
    [JSImport("renderWithColorsAndScreenDataUnmarshalled", "BlazorDoom/renderutils.js")]
    internal static partial string renderOnJS(byte[] screenData, int[] colors);
}