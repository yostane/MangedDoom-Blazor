using System.Runtime.InteropServices.JavaScript;
using System.Runtime.Versioning;

namespace BlazorDoom
{
    // declare the JS signature
    // Class and JS renderutils did not work. Weird ???
    // https://learn.microsoft.com/en-us/aspnet/core/blazor/javascript-interoperability/import-export-interop
    [SupportedOSPlatform("browser")]
    public partial class Renderer
    {
        [JSImport("renderWithColorsAndScreenDataUnmarshalled", "blazorDoom/renderer.js")]
        internal static partial string renderOnJS(byte[] screenData, int[] colors);


        [JSImport("playSound", "blazorDoom/renderer.js")]
        internal static partial string playSoundOnJS(int[] samples, int sampleRate, int channel);

        [JSImport("playMusic", "blazorDoom/renderer.js")]
        internal static partial string playMusicOnJS(int[] samples, int sampleRate, int channel);
    }
}