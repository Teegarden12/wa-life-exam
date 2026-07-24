#region Using declarations
using System;
using System.IO;
using System.Globalization;
using NinjaTrader.Cbi;
using NinjaTrader.Data;
using NinjaTrader.NinjaScript;
#endregion

// BarLogger — a tiny NinjaTrader indicator that appends each CLOSED bar to a
// CSV file. The paper bot (bot.py --data-source csv) reads that file so it can
// make decisions on your REAL futures data feed, using the exact instrument
// you'll mirror in Lucid.
//
// This indicator ONLY writes price data to a file. It places no orders and
// touches no account.
//
// How to use:
//   1. In NinjaTrader: New > NinjaScript Editor. Right-click Indicators > New.
//      Paste this file's contents, replacing the generated stub, and Compile
//      (F5). (Or drop this .cs into
//      Documents\NinjaTrader 8\bin\Custom\Indicators\ and compile.)
//   2. Open a chart of the instrument and bar type you want (e.g. MES 1-minute).
//      IMPORTANT: use the same instrument you'll trade in Lucid.
//   3. Apply the "BarLogger" indicator to the chart. Set OutputPath to the same
//      bars.csv the bot reads.
//   4. Run the bot:  python3 bot.py --data-source csv --symbol MES --csv-file bars.csv
//
// The file gets a header row once, then one line per closed bar:
//   time,open,high,low,close,volume

namespace NinjaTrader.NinjaScript.Indicators
{
    public class BarLogger : Indicator
    {
        private string lastPath;

        protected override void OnStateChange()
        {
            if (State == State.SetDefaults)
            {
                Name        = "BarLogger";
                Description = "Appends each closed bar to a CSV for the paper bot.";
                Calculate   = Calculate.OnBarClose;   // only completed bars
                IsOverlay   = true;
                OutputPath  = @"C:\paper-bot\bars.csv";
            }
        }

        protected override void OnBarUpdate()
        {
            // Only act on the primary series and on fully closed bars.
            if (BarsInProgress != 0)
                return;
            if (CurrentBar < 1)
                return;

            try
            {
                bool newFile = !File.Exists(OutputPath) || lastPath != OutputPath;

                // Ensure directory exists.
                string dir = Path.GetDirectoryName(OutputPath);
                if (!string.IsNullOrEmpty(dir) && !Directory.Exists(dir))
                    Directory.CreateDirectory(dir);

                using (StreamWriter sw = new StreamWriter(OutputPath, append: true))
                {
                    if (newFile && new FileInfo(OutputPath).Length == 0)
                        sw.WriteLine("time,open,high,low,close,volume");

                    var ci = CultureInfo.InvariantCulture;
                    // Time[0] is the timestamp of the bar that just closed.
                    string line = string.Join(",",
                        Time[0].ToString("yyyy-MM-ddTHH:mm:ss", ci),
                        Open[0].ToString(ci),
                        High[0].ToString(ci),
                        Low[0].ToString(ci),
                        Close[0].ToString(ci),
                        ((long)Volume[0]).ToString(ci));
                    sw.WriteLine(line);
                }
                lastPath = OutputPath;
            }
            catch (Exception ex)
            {
                Print("BarLogger write error: " + ex.Message);
            }
        }

        #region Properties
        [NinjaScriptProperty]
        [System.ComponentModel.Display(Name = "OutputPath", Order = 1,
            GroupName = "Parameters",
            Description = "Full path to the CSV the paper bot reads.")]
        public string OutputPath { get; set; }
        #endregion
    }
}
