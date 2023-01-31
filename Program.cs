using System;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;

namespace BlazorDoom
{
    public partial class MainJS
    {
        static Controller? controller;

        public static async Task Main()
        {
            if (!OperatingSystem.IsBrowser())
            {
                throw new PlatformNotSupportedException("This demo is expected to run on browser platform");
            }

            Console.WriteLine("Ready!");
        }
    }
}