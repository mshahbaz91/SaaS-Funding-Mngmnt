using ScheduledTask.Common;
using ScheduledTask.Model;
using ScheduledTask;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using DocuSign.eSign.Model;

namespace DSConnection
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string path = ConfigurationManager.AppSettings["logPath"];
            Directory.CreateDirectory(path);
            path += ConfigurationManager.AppSettings["logFile"];

            IDocuSignAuth _docuSignAuth = new DocuSignAuth();

            var authToken = _docuSignAuth.GetOAuthToken();
            string accessToken = authToken.access_token;
            string basePath = ConfigurationManager.AppSettings["basePath"];
            string accountId = ConfigurationManager.AppSettings["accountId"];

            try
            {
                //Get all the envelopes to sign
                EnvelopesInformation results = SearchDocuSignData.CheckConnection(accessToken, basePath, accountId);
                using (StreamWriter w = File.AppendText(path))
                {
                    w.Write("\r\nLog Entry : ");
                    w.WriteLine($"{DateTime.Now.ToLongTimeString()} {DateTime.Now.ToLongDateString()}");
                    w.WriteLine("Connection is valid");
                    w.WriteLine("-------------------------------");
                    Console.WriteLine("Connection is valid");
                    Console.ReadKey();
                }
            }

            catch (Exception ex)
            {
                using (StreamWriter w = File.AppendText(path))
                {
                    w.Write("\r\nLog Entry : ");
                    w.WriteLine($"{DateTime.Now.ToLongTimeString()} {DateTime.Now.ToLongDateString()}");
                    w.WriteLine("Connection is not valid");
                    w.WriteLine("-------------------------------");
                }
                Console.WriteLine("Connection is not valid");
                Console.ReadKey();
            }
        }
    }
}
