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

        [JSImport("getBaseUrl", "main.js")]
        public static partial string getBaseUrl();

        public static async Task Main()
        {

            if (!OperatingSystem.IsBrowser())
            {
                throw new PlatformNotSupportedException("This demo is expected to run on browser platform");
            }

            Console.WriteLine("Loading assets");
            string wadUrl = $"{getBaseUrl()}doom1.wad";
            string soundFontUrl = $"{getBaseUrl()}TimGM6mb.sf2";
            // string soundFontUrl = "http://localhost:5000/Roland_SC-55_v3.7.sf2";
            string[] args = { };
            string[] configLines = { };
            var http = new HttpClient();
            //jsProcessRuntime.InvokeVoid("gameLoop");
            Console.WriteLine(wadUrl);
            var stream = await http.GetStreamAsync(wadUrl);
            var soundFontStream = await http.GetStreamAsync(soundFontUrl);
            var commandLineArgs = new ManagedDoom.CommandLineArgs(args);
            ManagedDoom.DoomApplication.SoundFontStream = soundFontStream;
            app = new ManagedDoom.DoomApplication(commandLineArgs, configLines, http, stream, wadUrl);

            Console.WriteLine("Ready!");
        }
    }
}