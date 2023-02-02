using System;
using System.Net.Http;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;

namespace BlazorDoom
{
    class BlazorDoom
    {
        static ManagedDoom.DoomApplication app = null;

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


}