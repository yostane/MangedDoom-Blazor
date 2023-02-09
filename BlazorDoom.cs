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
            await JSHost.ImportAsync("blazorDoom/renderer.js", "./renderer.js");


            string wadUrl = "http://localhost:51501/doom1.wad";
            string[] args = { };
            string[] configLines = { };
            var http = new HttpClient();
            //jsProcessRuntime.InvokeVoid("gameLoop");
            Console.WriteLine(wadUrl);
            var stream = await http.GetStreamAsync(wadUrl);
            var commandLineArgs = new ManagedDoom.CommandLineArgs(args);
            app = new ManagedDoom.DoomApplication(commandLineArgs, configLines, http, stream, wadUrl);

            Console.WriteLine("Ready!");
        }
    }
}